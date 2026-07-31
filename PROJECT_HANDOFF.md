# Project Handoff — "Today" App/Website

Written as a continuity brief for a new chat session. Paste this whole file (or point Claude at it) at the start of the new conversation.

## 1. What this is

A prototype for a "decide, not browse" activity/task generator, currently built as a mobile-first static website (plain HTML/CSS/JS, no framework, no build step, no backend). Working name: **"Today"** (previously called "Weekend" early on — the app was renamed but some early files still exist as historical snapshots, see §8).

Core mechanic: user spins/generates a suggestion for something to do, rather than browsing a list.

## 2. ⚠️ A pivot is in progress — NOT yet implemented

The user is actively reconsidering the product direction. As of this handoff, **none of this has been built yet** — it's still at the discussion/decision stage:

- **Platform**: move from "app-flavored" (bottom nav, mobile-only assumptions) to a **fully responsive website** usable on any device. Technically this is mostly additive (desktop breakpoints, re-enable hover), not a rebuild, since everything is already plain responsive HTML/CSS.
- **Scope**: broaden from "weekend activities near you" to **anything to do when free/bored** — fitness (train core/upper/lower, cardio), new experiences (rock climbing, ice skating, kayaking, yoga), food (restaurants, cafés, bubble tea, street food, cook/bake at home), activities (shopping, movies, shows, photography, sunset-watching), etc. Both location-bound and non-location tasks should be included.
- **New interaction model being considered**: instead of (or before) a heavy onboarding, the core moment becomes **"What are you feeling today?"** — big mood/category buttons, then a light 1-2 question filter (or 2-3 preset options) for time/budget/distance, right before generating. The existing 3-screen onboarding (interests/vibe → budget/distance/time/region) **"might need to change"** to fit this — not yet decided how.
- **New "reroll-until-happy" mechanic**: generating something the user doesn't want doesn't waste it — it drops into a running list shown right under the generator (this session's "passed on" list), and the user keeps spinning until something clicks. This is a **different concept from the existing History page** (which logs completed activities) — there will likely be two separate lists: an ephemeral "rejected this session" trail near the generator, and the persistent "completed" History.
- **Multiple simultaneous ongoing tasks**: not just one "in progress" activity at a time — several can run concurrently, shown near the generator so the user can jump back to any of them. (Currently built: only ONE ongoing activity is supported via a single `ongoingActivity` localStorage key — see §6.)
- **Task pool**: mixes system-suggested tasks AND user-added tasks together when generating.
- **User-added tasks**: private per-user (not shared/public). Needs a Name and a Location field; explicitly **no fixed "time" field** on creation — "how much time do I have" is meant to be handled by the reroll mechanic instead of a rigid tag.
- **Guest vs. signed-in**: guests get fully-generated tasks only (no adding their own); adding tasks requires being signed in.
- **History (completed tasks)**: user decided to **keep it** even though many users may be one-time/guest visitors — it's already built and costs nothing to leave in, just shouldn't get further investment right now.
- **Backend/database/auth**: after discussion, **leaning toward NOT needing any of this**. Reasoning: the target audience is the user personally + friends/family (each on their own device) + a portfolio showcase — not a multi-device-syncing public service. `localStorage` (already how everything works) is suf­ficient since each person's own data staying local to their own browser is actually fine/desired. If a real backend is ever wanted later (cross-device sync, shared data), the recommendation given was **Firebase** — its client SDK talks directly to a database from the browser via `<script>` tags with no separate server needed, which fits the existing no-build-step architecture better than Supabase (also a valid all-in-one option, more SQL-flavored).
- **Naming**: still undecided — "Today" no longer feels tied to weekends, but the user hasn't picked a final name yet for the broader concept.
- **Category taxonomy**: the actual list of categories/subcategories under "what are you feeling today" is still a content task to flesh out — not yet decided in detail.

**None of the above pivot items have been coded.** Everything in §3 onward describes what's actually built right now, under the *old* "Weekend/Today activity-near-you" concept.

## 3. Tech stack

- Plain HTML + CSS + vanilla JS. No React/Vue/build tools/npm dependencies.
- One shared stylesheet (`style.css`) with CSS custom properties as design tokens.
- One shared script (`script.js`) with reusable helpers: `goTo()`/`initLinks()` (page-fade navigation via `data-href`), `initSelectable()` (chip/card multi- or single-select), `bindReadyState()`, `runLoadingSequence()`, `initSlider()` (custom draggable/tappable/keyboard-accessible stepped slider).
- No backend, no database, no real authentication. All "persistence" is `localStorage`/`sessionStorage` in the browser (see §6).
- Google Fonts: Baloo 2 (display/headings), Work Sans (body/tagline), Poppins (form/UI text).

## 4. File-by-file breakdown

| File | Purpose |
|---|---|
| `index.html` | Landing animation (illustrated sky → logo reveal, all in-page) → Login / Register / Forgot Password / Reset Password (tab-switching single-page panels). Login and "Continue as Guest" both go to `home-single.html`. Register goes to `onboarding1.html`. Has real client-side form validation (email format, password length, confirm-password match). |
| `onboarding1.html` | "Welcome" screen — flat SVG illustration (sun, clouds, café/museum/nature/fitness/reading/movies/picnic icons), floating animations, "Get Started" → `onboarding2.html`. |
| `onboarding2.html` | Interest chips (20, emoji-prefixed) + vibe chips (12, emoji-prefixed). Continue disabled until 5+ interests selected. Saves selections to `localStorage` (`userInterests`, `userVibes`) on Continue. Supports an "edit mode" (dots hidden, back button shown) when arrived at via Profile → Edit Preferences. |
| `onboarding3.html` | Budget / Travel Distance / Available Time as custom draggable **sliders** (not buttons) + Region single-select (Singapore areas: North/West/East/Central/Northwest/Northeast). Saves to `localStorage` (`userBudget`, `userDistance`, `userTime`, `userRegion`). Loading sequence → `home-single.html`. Edit-mode: "Save Changes" returns to `profile.html` instead. |
| `home-single.html` | **The main home screen.** Combined date/time/weather widget (weather is static mock data — flagged as needing a real API). Spin mechanic: tap Spin → icon shuffles through sample picks → lands on one, **weighted toward the user's saved interests** (falls back to random if none saved). "Let's Go" stores the pick in `sessionStorage` and goes to `activity-detail.html`. Also handles the **"ongoing activity"** state: if `localStorage.ongoingActivity` is set, shows a persistent "Currently Doing" card with Cancel/Done instead of the spin prompt; Done logs to `activityHistory`. |
| `saved.html` | List of saved places, data-driven from a JS array (8 samples) merged with any user-added places from `localStorage.savedPlaces`. Working search input + category filter chips. "+" button → `add-place.html`. Each card is clickable through to `activity-detail.html`. |
| `add-place.html` | Form to manually add a saved place: icon picker (5 preset icon options), Name, Tag chips, Notes. Saves into `localStorage.savedPlaces`. |
| `profile.html` | Avatar/name (placeholder), a "Preferences" row → `preferences.html`, a "History" row → `history.html`, and a settings list (Notifications, Language, Dark Mode, Units, Privacy & Data, Help & Support, About, Log Out, Delete Account — **all static stubs, not wired to real functionality** except Log Out which goes to `index.html`). |
| `preferences.html` | Reads and displays the real saved onboarding data from `localStorage` (interests/vibe/budget/distance/time/region), with a "Not set yet" fallback if empty. "Edit Preferences" sets an edit-mode flag and goes to `onboarding2.html`. |
| `activity-detail.html` | Full detail view of a picked activity (from `sessionStorage.todayPick`, with a fallback sample if empty): hero icon, title, description, tags, a "why we picked this" line, Save toggle, Get Directions → `directions.html`, "Let's Do This" → sets `localStorage.ongoingActivity` and returns to `home-single.html`. |
| `directions.html` | Stylized **placeholder** map (SVG illustration, explicitly not a real map API) with a route/pins, plus a Walk/Drive/Transit/Cycle mode selector with mock ETAs that update on tap. |
| `history.html` | Lists completed activities from `localStorage.activityHistory` (logged when "Done" is tapped on an ongoing activity), with an empty state if none yet. |
| `style.css` | Shared design tokens (colors, spacing, radius, shadows, type) + all shared component styles (buttons, chips, cards, sliders, bottom nav, form fields). |
| `script.js` | Shared JS helpers (see §3). |
| `weekendindexV1.html`, `weekendindexV2.html` | **Intentional frozen snapshots** from an earlier iteration (before the "Today" rename and before the dissolve-style landing animation was finalized). The user explicitly asked these be kept as version references — **do not edit or delete these** unless asked. |
| `assets/logo.png` | App logo (blue stylized "t" mark on pale-yellow tile). |
| `assets/landing-sky.jpg` | The illustrated sky/clouds image used in index.html's landing animation. |
| `assets/icons/*.png` | 20 exported PNG icons (512×512, transparent bg) — one per onboarding2 interest (cafes, food, desserts, reading, museums, art, nature, sunrise-spots, picnics, shopping, movies, gaming, photography, crafts, baking, fitness, yoga, pet-cafes, night-walks, hidden-gems). **Note**: these are renders of Apple's system Color Emoji glyphs, fine for personal/prototype use, but not freely licensable if this ever ships as a public product — would need custom icons or an open-license emoji set (Twemoji/OpenMoji) at that point. |

## 5. Design tokens (from `style.css`)

- Colors: `--color-bg: #fffbc9` (pale yellow), `--color-card: #fefeff` (near-white), `--color-text: #37323e` (dark charcoal), `--color-accent: #6198ff` (blue), `--color-accent-soft: #eef3ff`, `--color-orange: #ffb37a` (used sparingly, e.g. sun icon).
- Fonts: `--font-display` = Baloo 2, `--font-heading` = Poppins, `--font-body` = Work Sans.
- Radius scale: `--radius-lg/md/sm/pill`. Spacing scale: `--space-1` through `--space-7`.
- Bottom nav is a floating rounded pill (not a flush full-width bar), active tab shows icon-above-label with an accent-colored pill background; inactive tabs are icon-only.

## 6. Data model (all client-side, no backend)

**`localStorage`** (persists across sessions, per-browser):
- `userInterests`, `userVibes` — arrays of selected chip labels from onboarding2.
- `userBudget`, `userDistance`, `userTime`, `userRegion` — strings from onboarding3's sliders/region select.
- `savedPlaces` — array of user-added place objects (`{icon, title, desc, tags, category}`), seeded with samples on first load if empty.
- `ongoingActivity` — the single currently-in-progress activity object, or absent. (Pivot plan wants to support *multiple* simultaneous ongoing activities — not yet built.)
- `activityHistory` — array of completed activity records with a `completedAt` timestamp.

**`sessionStorage`** (cleared when the tab closes):
- `todayPick` — the activity object being handed off to `activity-detail.html` (set by Home's "Let's Go", or by clicking a card in Saved/list views).
- `onboardingEditMode` — `'true'` while onboarding2/3 are being used in "edit mode" from Profile.

## 7. Known limitations / explicitly-flagged placeholders

- Weather widget on Home is static mock data (`28°C Sunny`), not a real API.
- Directions page's map is a hand-drawn SVG illustration, not a real map integration.
- Login/Register have real-looking validation but no real backend — any well-formed input "succeeds."
- Several Profile settings rows (Notifications, Dark Mode, Language, Units, Privacy & Data, Help & Support, About, Delete Account) are static, non-functional stubs.
- The 20 exported interest icons are Apple emoji renders (see §4 note on licensing if shipped publicly).

## 8. Notable bugs found & fixed this session (context if similar issues resurface)

- Converting clickable `<div>`s to semantic `<button>` elements (done for accessibility/semantic-HTML reasons) initially left `.nav-item` and `.settings-row` with the browser's default gray button background, because those two classes had never explicitly set `background` (they'd relied on transparency over their parent's background, which only works for `<div>`s). Fixed by adding explicit `background: none` to both.
- A batch div→button conversion in `add-place.html` once left mismatched tags (`<button>` opening, `</div>` closing) — fixed, but worth double-checking that file if it's touched again.
- All ~24 scattered inline `style="..."` attributes across the active app were moved into real CSS classes (new utilities: `.flex1`, `.btn-block`, `.hidden`, `.spacer`/`.spacer-lg`, plus a few page-specific ones) — `weekendindexV1/V2.html` were deliberately left untouched.
- A Nielsen's 10 Usability Heuristics evaluation was done against the whole app; strongest areas were Aesthetic/Minimalist Design, Recognition-not-Recall, and Consistency; weakest was Error Prevention/Recovery (no real error states anywhere, expected given no backend).

## 9. How the user likes to work (important for continuity)

- **Hard rule, explicitly stated and escalated during this session**: always type out the plan in plain text and **wait for explicit confirmation** ("yes," "go ahead," "proceed," etc.) before writing any code or generating output for anything non-trivial (multi-file changes, new features, responding to a batch of feedback). Don't infer approval from silence.
- Prefers direct, concrete answers to technical questions (e.g., the domains/APIs question) over hedging.
- Responds well to concise multiple-choice-style questions when there's a genuine fork in approach; dismisses/ignores such questions when the answer is "obvious enough to just proceed" — use judgment about when a question is actually needed vs. just stating an assumption and moving on.
- Iterates a lot via screenshots/visual review — has caught several real bugs this way (e.g., the button-background issue above), so visual/computed-style verification before claiming something works has been valuable, not just code review.
- Has a memory system with saved notes from this session already in place (project concept, "plan before executing" preference, third-party-skill vetting checklist, proactive skill-suggestion habit for UX project phases) — a new session in this same project should already have access to those automatically.

## 10. Suggested next step for the new session

The pivot in §2 is the live, unresolved thread. The most natural next step is to nail down the **category taxonomy** for "what are you feeling today" and decide how the lightweight per-use mood-check relates to the existing onboarding (replace it, or keep a much shorter onboarding alongside it) — both flagged as open threads the user hasn't decided yet. Don't start implementing the pivot without walking through that first.
