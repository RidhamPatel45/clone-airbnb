# Project Instructions for AI Coding Agent

## What this project is
A desktop-only, pixel-accurate clone of a single Airbnb listing page
(reference: https://airbnb-clone-umber-two.vercel.app), including two
overlay views (Photo Tour, Lightbox). See `PROJECT_PLAN.md` for the full
phased plan and `BEHAVIOR_CHECKLIST.md` for the fidelity spec.

## Ground rules
- Desktop viewport only (assume ~1440px width). Do not build responsive/
  mobile layouts.
- Do not add features that aren't in the reference (no wishlist, no
  filters, no extra pages). Fidelity is scored, not scope.
- Use static local JSON for listing data — no backend, no live API calls.
- Never lift/copy the reference site's actual source code, assets, or
  markup verbatim — rebuild from observation (recon notes/screenshots),
  not from viewing their bundled JS/CSS directly. Original implementation
  required; a plagiarism check will run against submissions.
- Follow the tech stack in `PROJECT_PLAN.md` §2 unless a limitation forces
  a change — flag any deviation instead of silently switching.
- Work phase by phase per `PROJECT_PLAN.md`. Do not skip ahead to the
  Photo Tour/Lightbox before the Listing Page structure is stable.
- After finishing a phase, update the corresponding checkboxes in
  `PROJECT_PLAN.md` and any newly-observed rows in `BEHAVIOR_CHECKLIST.md`.

## Sub-agents available
- `pixel-diff-reviewer` — invoke after each visual section is built, before
  moving to the next, to catch spacing/color/font drift early.
- `accessibility-auditor` — invoke after Phase 5 (and again before final
  packaging) to verify keyboard nav, ARIA labels, and focus management.
- `motion-qa` — invoke after Phases 3 and 4 to verify overlay transitions,
  keyboard bindings, and focus-return behavior.

## Logging requirement
Every prompt given to you (or to a sub-agent) during this build must be
appended, verbatim, to `PROMPT_LOG.md` in order, before moving to the next
prompt. This is a required submission deliverable — do not let it fall
behind.

## Definition of done
See `PROJECT_PLAN.md` §5. Do not declare a phase complete until its
checklist items are checked.
