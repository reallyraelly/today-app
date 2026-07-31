# Mood-Check + Taxonomy Design

Status: Approved by user 2026-07-31. First sub-project of the broader pivot described in `PROJECT_HANDOFF.md` §2.

## 1. Purpose

Replace the existing 3-screen onboarding (welcome → interests/vibes → budget/distance/time/region) with a lightweight, per-session "what are you feeling today?" mood-check that narrows the pool the existing Spin mechanic draws from. This is the first piece of the app→website, weekend→broader-task-generator pivot; it does not implement the reroll-until-happy mechanic, multiple ongoing tasks, user-added task mixing, location filtering, or the responsive/desktop pass — those remain separate future sub-projects.

## 2. Flow & screens

- `index.html` (Register / Login / Continue as Guest) — all three paths now go straight to `home-single.html`. No account-level interest/preference capture happens at signup.
- `onboarding1.html`, `onboarding2.html`, `onboarding3.html` are removed from the live flow. They may be kept on disk as historical reference (same treatment as `weekendindexV1.html`/`V2.html`) or deleted — not decided here, not blocking.
- On arriving at home, if no mood is set for the current browser session:
  - **Step 1 — Mood**: show the 6 top-level mood buttons plus a `Surprise Me` sibling button (7 buttons total, no nesting).
  - **Step 2 — Subcategory**: tapping any mood button except Surprise Me reveals that mood's subcategory chips (see §4 for the full list per category).
  - Tapping **Surprise Me** at Step 1 skips Step 2 entirely and sets the active pool to every item across every category.
  - Tapping a subcategory sets the active pool to that subcategory's curated items and returns to the normal home screen.
- The active mood/subcategory is shown near the Spin button as a small pill (e.g. "Fitness → Cardio · change") so the user can reopen mood-check and pick something else without leaving or reloading the page.
- **Spin behaves exactly as it does today** — shuffle animation → lands on one item → "Let's Go" → `activity-detail.html` — the only change is that it draws from the mood-narrowed pool instead of the full interest-weighted pool. Mood-check does not auto-trigger Spin; the user still taps Spin manually as a separate, deliberate action.
- Mood/subcategory stays sticky for the rest of the session (reused across repeated Spins) until the user explicitly changes it via the pill.

## 3. Data model changes

**New:**
- `taxonomy.js` (or equivalent static data file) — single source of truth for the category → subcategory → item structure, including each category/subcategory's emoji/icon and label. Drives both the mood-check UI and the Spin pool.
- `sessionStorage.sessionMood` — the selected top-level mood, or a sentinel value for Surprise Me.
- `sessionStorage.sessionSubcategory` — the selected subcategory, absent when Surprise Me was chosen at Step 1.
  - Both cleared automatically when the tab closes, same lifecycle as the existing `sessionStorage.todayPick`.

**Removed / orphaned by this change:**
- `localStorage.userInterests`, `userVibes`, `userBudget`, `userDistance`, `userTime`, `userRegion` — nothing writes these anymore once onboarding2/3 are out of the flow.
- `sessionStorage.onboardingEditMode` — no onboarding left to edit.
- **Known side effect, explicitly out of scope for this design**: `preferences.html` and the "Preferences" row on `profile.html` read the now-dead keys above and will always render their "Not set yet" empty state. This needs its own follow-up pass on the Profile area; not fixed here.

**Unchanged:** `localStorage.savedPlaces`, `ongoingActivity`, `activityHistory`; `sessionStorage.todayPick`.

## 4. Taxonomy

Two-level structure, 6 categories + Surprise Me, 44 subcategories total, biased toward cheap/casual/spontaneous picks over pricier special-occasion ones.

1. **🏋️ Fitness & Move** — Train Core, Train Upper, Train Lower, Cardio, Yoga/Stretch, Bouldering/Climbing Gym, Cycling, Badminton/Sports Court, Dance
2. **🍽️ Food & Drink** — Restaurant, Café Hopping, Bubble Tea, Street Food/Hawker, Dessert/Sweets, Supper Spot, Cook/Bake at Home
3. **🧭 New Experience** — Rock Climbing (outdoor), Ice Skating, Kayaking, Escape Room, Something Adventurous
4. **🎨 Culture & Creative** — Photography Walk, Movies, Live Shows/Concerts, Museum/Art Gallery, Pottery/Craft Workshop, Journaling/Sketching
5. **🛍️ Out & About** — Shopping, Thrifting, Sunset-Watching, Explore a New Neighborhood, Night Market
6. **🌿 Chill & Hangout** — Board Game Café, Karaoke/KTV, Bowling, Mini Golf, Pool/Billiards, Arcade, Park Hangout, Beach, Petting Café, Plant Shopping, Spa/Self-care, Reading/Study Café
7. **🎲 Surprise Me** — top-level sibling, no subcategory, draws from the union of all items above

### Item content format

Each leaf item is `{title, description}`:
- `title` — short, specific, actionable (e.g. "10-min HIIT", "Bake a Tiramisu", "Visit Asian Civilisations Museum") — never a generic label like "do some cardio."
- `description` — one short sentence, matches the tone `activity-detail.html` already uses.
- Target ~10 items per subcategory (~440 items total across all 44 subcategories) to give a reroll several turns before repeats become noticeable, without requiring an unreasonable amount of content authoring up front.
- Tone/cost bias: favor no-cost or low-cost, no-advance-booking-required picks; pricier/special-occasion subcategories (Karting, Wakeboarding, VR Gaming) were dropped from New Experience for this reason.

### Content authoring approach

The full ~440-item list is authored directly into `taxonomy.js` during implementation, not enumerated item-by-item in this spec or approved one at a time. The user reviews the finished data file as a whole once it's written, and edits/cuts from there.

## 5. Explicitly out of scope (deferred to future sub-projects)

- Reroll-until-happy running "passed on" list.
- Multiple simultaneous ongoing activities.
- Mixing user-added tasks into the generated pool.
- Any location/distance filtering or geolocation.
- The separate lightweight time/budget/distance filter step (dropped entirely per §2 of the handoff — reroll is meant to substitute for it, not built here).
- Responsive/desktop layout pass.
- Fixing `preferences.html`/`profile.html`'s now-orphaned reads of removed onboarding keys.
