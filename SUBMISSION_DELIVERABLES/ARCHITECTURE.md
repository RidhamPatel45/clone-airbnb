# Production Architecture: Vacation-Rental Marketplace (Airbnb-Scale)

## 1. System Overview & Scale Targets

This architecture is designed for a global vacation-rental marketplace operating at Airbnb scale:
- **Global Inventory**: 100M+ listings across 100,000+ cities and 220+ countries/regions.
- **Traffic Profile**: 500M+ Monthly Active Users (MAUs), 50,000+ search requests/second at peak, 5,000+ bookings/second during major seasonal surges.
- **Availability Target**: 99.99% uptime (< 52 minutes downtime/year) with multi-region active-active resilience.
- **Latency SLAs**:
  - Home & Listing Detail Pages: P95 < 250ms worldwide (via edge CDN + ISR/SSR).
  - Search & Filtering: P95 < 150ms.
  - Booking & Checkout flow: P99 < 800ms with strict ACID double-booking prevention.

---

## 2. High-Level Architectural Topology

```
                                    +-----------------------------------------+
                                    |         Clients (Web / iOS / Android)   |
                                    +-----------------------------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |  Anycast DNS + Cloudflare / CloudFront  |
                                    |  - WAF / DDoS Mitigation / Bot Shield   |
                                    |  - Edge Caching (HTML ISR, Static, Media)|
                                    |  - TLS 1.3 Termination, HTTP/3 / QUIC   |
                                    +-----------------------------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |  Kong / Envoy API Gateway & Mesh Edge   |
                                    |  - JWT / OAuth2 Authentication          |
                                    |  - Rate Limiting (Token Bucket)         |
                                    |  - Dynamic Canary & Traffic Routing     |
                                    |  - GraphQL Federation / BFF Gateway     |
                                    +-----------------------------------------+
                                                         |
         +--------------------+--------------------------+--------------------+-------------------------+
         |                    |                          |                    |                         |
         v                    v                          v                    v                         v
+------------------+ +------------------+     +--------------------+ +-------------------+    +-------------------+
| Listing & Media  | | Search & Discover|     | Availability Engine| | Booking & Payment |    | Reviews & Trust   |
| Service (Golang) | | Service (Java)   |     | & Locks (Rust/Go)  | | Service (Go/Java) |    | Service (Node/Go) |
+------------------+ +------------------+     +--------------------+ +-------------------+    +-------------------+
         |                    |                          |                    |                         |
         +---------+          +------------+             +---------+          +------------+            +---------+
                   |                       |                       |                       |                      |
                   v                       v                       v                       v                      v
        +-------------------+    +--------------------+  +-------------------+   +--------------------+ +-------------------+
        | Primary DB:       |    | Elasticsearch /    |  | Distributed Cache:|   | ACID Ledger & DB:  | | Reviews Store:    |
        | Aurora PostgreSQL |    | OpenSearch Cluster |  | Redis Cluster     |   | CockroachDB /      | | Cassandra / Scylla|
        | (Sharded by City) |    | (Geospatial H3/BBox|  | (Inventory bitmap |   | Aurora Multi-Region| | (High write       |
        | + Read Replicas   |    |  + Vector Search)  |  |  + Redlock mutex) |   | (Two-phase commit) | |  throughput)      |
        +-------------------+    +--------------------+  +-------------------+   +--------------------+ +-------------------+
                   |                                                                       |
                   +---------------------------------------+-------------------------------+
                                                           |
                                                           v
                                            +------------------------------+
                                            | Apache Kafka Event Bus       |
                                            | - listing-events (CDC via DB)|
                                            | - booking-created/confirmed  |
                                            | - payment-settled            |
                                            | - notification-triggers      |
                                            +------------------------------+
                                                           |
                      +------------------------------------+------------------------------------+
                      |                                    |                                    |
                      v                                    v                                    v
          +------------------------+          +-------------------------+          +------------------------+
          | Search Indexer Worker  |          | Async Notification      |          | Media Transcoding      |
          | (Consumes CDC -> updates|         | Service (Email/SMS/Push |          | Pipeline (S3 + Lambda  |
          |  ES / OpenSearch index)|          |  via Twilio, APNs, FCM) |          |  WebP, AVIF, Thumbnails|
          +------------------------+          +-------------------------+          +------------------------+
```

---

## 3. Deep-Dive Strategy by Tier

### 3.1. Frontend & Edge Tier (Web & Mobile Clients)
- **Framework**: Next.js App Router deployed across edge regions (Vercel Edge / AWS CloudFront + Lambda@Edge).
- **Hybrid Rendering Model**:
  - **Incremental Static Regeneration (ISR)**: Static listing page skeletons generated at build time; revalidated on-demand (`res.revalidate()`) upon host updates via webhook.
  - **Client-Side SWR / React Query**: Dynamic price calculation, real-time date availability, and localized currency rates hydrated client-side with cache fallback.
- **Asset Optimization Pipeline**:
  - Images uploaded directly to S3 via pre-signed URLs.
  - Event-driven AWS Lambda workers generate WebP, AVIF, and progressive JPEG variants at varying resolutions (100w, 400w, 800w, 1440w, 2048w).
  - CloudFront CDN edge delivers responsive `srcset` tailored to device DPR.

### 3.2. API Gateway & GraphQL Federation Tier
- **Gateway**: Envoy / Kong API Gateway with Apollo Router for GraphQL Federation.
- **Responsibilities**:
  - Rate limiting via Redis sliding window counter per client IP / user account.
  - OAuth2.0 / JWT validation at the edge with zero-roundtrip public key verification.
  - Request sanitization, payload inspection, and WAF protection against XSS/SQLi.
  - Client-specific Backend-For-Frontend (BFF) aggregation: Mobile clients receive trimmed payloads; desktop web receives full listing metadata.

### 3.3. Search, Discovery & Geospatial Indexing
- **Search Engine**: Distributed OpenSearch / Elasticsearch cluster with Uber H3 hexagonal spatial indexing.
- **Query Strategy**:
  - Bounding-box and polygon filtering for viewport-based map search.
  - Composite filters: Price buckets, room counts, amenities (bitset indexing for instant lookups).
  - Neural/Vector search embedding for semantic queries ("cozy cabin near ski lift with hot tub").
- **Sync Architecture**:
  - Change Data Capture (Debezium + Kafka) ingests row-level changes from Postgres directly into Kafka `listing-cdc` topic.
  - Stream consumers batch update OpenSearch within < 1000ms end-to-end latency.

### 3.4. Availability Engine & Booking Concurrency (Double-Booking Prevention)
- **Challenge**: Multiple users attempting to book the same dates simultaneously.
- **Solution — Multi-Tiered Lock Strategy**:
  1. **L1 Soft Lock (Redis)**: When user enters checkout, a 10-minute lease is acquired via `Redlock` distributed mutex (`SET resource_id user_id NX PX 600000`).
  2. **L2 Hard Lock & Transaction (ACID DB)**: CockroachDB / PostgreSQL row-level lock (`SELECT * FROM listing_calendar WHERE listing_id = ? AND date BETWEEN ? AND ? FOR UPDATE`).
  3. **Idempotency Key**: Every checkout request includes a unique client-generated UUID idempotency key stored in Redis to guarantee exactly-once payment authorization.

### 3.5. Data Storage & Partitioning Strategy
- **Listings & Metadata**: Amazon Aurora PostgreSQL partitioned horizontally by `geo_region_id` (Americas, EMEA, APAC) with read replicas in each region.
- **Reviews & Activity Feeds**: ScyllaDB / Apache Cassandra optimized for high-velocity write throughput and time-series clustering (`listing_id` partition key, `created_at DESC` clustering key).
- **Blob Storage**: AWS S3 with Object Lifecycle policies (Hot -> Standard-IA after 90 days -> Glacier for compliance archives).

### 3.6. Deployment, Observability & Disaster Recovery
- **Infrastructure**: Kubernetes (Amazon EKS) provisioned via Terraform / OpenTofu.
- **GitOps & Deployment**: ArgoCD implementing automated canary rollouts (5% -> 25% -> 100% with automated Prometheus error-rate rollbacks).
- **Observability Stack**:
  - Tracing: OpenTelemetry + Jaeger for distributed request spans.
  - Metrics: Prometheus + Grafana dashboards.
  - Logging: Fluentbit -> Vector -> OpenSearch.
- **Multi-Region Disaster Recovery**:
  - Active-Active in `us-east-1` and `eu-west-1` with Route 53 latency-based routing.
  - RPO (Recovery Point Objective) < 1 minute; RTO (Recovery Time Objective) < 2 minutes via automated failover.
