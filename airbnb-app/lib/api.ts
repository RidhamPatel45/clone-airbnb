export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) return "";
  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }
  return `https://${envUrl}`;
}

export interface ReservationPayload {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export async function createReservation(payload: ReservationPayload) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/reserve`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Reservation failed with status ${res.status}`);
  }

  return await res.json();
}
