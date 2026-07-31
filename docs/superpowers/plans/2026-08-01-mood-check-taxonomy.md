# Mood-Check + Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3-screen onboarding with a per-session "what are you feeling today?" mood-check that narrows the pool the existing Spin mechanic draws from, per `docs/superpowers/specs/2026-07-31-mood-check-taxonomy-design.md`.

**Architecture:** Two new pure-logic data/helper files (`taxonomy.js`, `mood-check.js`) plus a thin sessionStorage wrapper (`mood-session.js`), each written in the codebase's existing plain-global-function style (see `script.js`) but with a small CommonJS export guard at the bottom so they're also `require()`-able from Node for zero-dependency unit tests. `home-single.html` gets new mood-check UI markup wired to these files, and its existing Spin logic is repointed from the old hardcoded 5-sample array to the taxonomy-driven pool. `index.html` and `activity-detail.html` get small, targeted edits to stay consistent with the new flow.

**Tech Stack:** Plain HTML/CSS/JS, no build step, no npm dependencies. Tests use only Node's built-in `assert` and `require` (no test framework, no `package.json` needed) — run directly with `node <file>.test.js`.

## Global Constraints

- No build tools, no npm dependencies, no new frameworks or libraries (per `PROJECT_HANDOFF.md` §3).
- New JS files use plain global `function`/`const` declarations (matching `script.js`'s style), not ES modules — but end with a `module.exports` guard (`if (typeof module !== 'undefined' && module.exports) {...}`) so the same file loads as a browser `<script>` global AND is `require()`-able from Node for tests, with zero build step either way.
- Reuse existing utility classes (`.chip`, `.chip-grid`, `.hidden`, `.flex1`) and helpers before inventing new CSS/JS — only add new styles for things that genuinely don't exist yet.
- Buttons must have an explicit `background` set in CSS if they don't already inherit one — a prior bug in this codebase (documented in `PROJECT_HANDOFF.md` §8) came from relying on transparency that only worked for `<div>`s.
- Item content tone (from the spec): specific and actionable (e.g. "10-Minute HIIT", never "do some cardio"), one-sentence description, biased toward free/cheap/no-booking-required activities.

**A note on Task 1's content:** Task 1 requires authoring roughly 440 short pieces of copy (the curated activity pool). Per the approved spec, this content is authored directly into the data file during implementation rather than enumerated and pre-approved item-by-item. This plan fully specifies the exact schema, the exact list of every category/subcategory that must exist (used by the task's automated test), and a complete worked example for one subcategory per category to lock the format and tone unambiguously. The remaining subcategories must be authored by the same rules.

---

### Task 1: Taxonomy data module

**Files:**
- Create: `taxonomy.js`
- Test: `taxonomy.test.js`

**Interfaces:**
- Produces: `TAXONOMY` (array, see shape below), `SURPRISE_ID` (string constant, value `'surprise'`), `getPool(taxonomy, categoryId, subcategoryId)` → `Array<{title, description, categoryId, categoryLabel, categoryIcon, subcategoryId, subcategoryLabel}>`. All three are browser globals (via `<script src="taxonomy.js">`) and Node-`require()`-able.

**Data shape:**

```js
{
  id: 'fitness',              // kebab-case, stable identifier
  label: 'Fitness & Move',    // shown in UI
  emoji: '🏋️',                 // used on the Step 1 mood button
  icon: '<svg inner markup>', // used as the hero icon on Spin/detail pages (inner shapes only, no outer <svg> tag — matches the convention already used by pick.icon in home-single.html)
  subcategories: [
    {
      id: 'cardio',
      label: 'Cardio',
      items: [
        { title: '10-Minute HIIT', description: 'A quick full-body burner you can do on the living room floor, no equipment needed.' },
        // ... ~10 total
      ]
    }
    // ...
  ]
}
```

**Full category/subcategory list the test in this task checks for** (id → label):

- `fitness` — Fitness & Move: `train-core` (Train Core), `train-upper` (Train Upper), `train-lower` (Train Lower), `cardio` (Cardio), `yoga-stretch` (Yoga/Stretch), `bouldering` (Bouldering/Climbing Gym), `cycling` (Cycling), `badminton` (Badminton/Sports Court), `dance` (Dance)
- `food` — Food & Drink: `restaurant` (Restaurant), `cafe-hopping` (Café Hopping), `bubble-tea` (Bubble Tea), `street-food` (Street Food/Hawker), `desserts` (Dessert/Sweets), `supper` (Supper Spot), `cook-bake` (Cook/Bake at Home)
- `new-experience` — New Experience: `rock-climbing` (Rock Climbing), `ice-skating` (Ice Skating), `kayaking` (Kayaking), `escape-room` (Escape Room), `adventurous` (Something Adventurous)
- `culture` — Culture & Creative: `photography-walk` (Photography Walk), `movies` (Movies), `live-shows` (Live Shows/Concerts), `museum-art` (Museum/Art Gallery), `pottery-craft` (Pottery/Craft Workshop), `journaling` (Journaling/Sketching)
- `out-and-about` — Out & About: `shopping` (Shopping), `thrifting` (Thrifting), `sunset-watching` (Sunset-Watching), `explore-neighborhood` (Explore a New Neighborhood), `night-market` (Night Market)
- `chill-hangout` — Chill & Hangout: `board-game-cafe` (Board Game Café), `karaoke` (Karaoke/KTV), `bowling` (Bowling), `mini-golf` (Mini Golf), `pool-billiards` (Pool/Billiards), `arcade` (Arcade), `park-hangout` (Park Hangout), `beach` (Beach), `petting-cafe` (Petting Café), `plant-shopping` (Plant Shopping), `spa` (Spa/Self-care), `reading-study-cafe` (Reading/Study Café)

That's 6 categories, 44 subcategories.

**Category-level icons** (inner SVG markup, wrapped by callers as `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#fffbc9"/>${icon}</svg>` — same convention as the existing `pick.icon` values in `home-single.html`):

- `fitness`: `<rect x="20" y="46" width="10" height="14" rx="3" fill="#37323e"/><rect x="70" y="46" width="10" height="14" rx="3" fill="#37323e"/><rect x="30" y="50" width="40" height="6" rx="3" fill="#6198ff"/>`
- `food`: `<path d="M-16,-4 h32 v18 a16,16 0 0 1 -16,16 a16,16 0 0 1 -16,-16 Z" fill="#37323e" transform="translate(50,54)"/><path d="M16,2 h8 a8,8 0 0 1 0,16 h-6" fill="none" stroke="#37323e" stroke-width="4" transform="translate(50,54)"/>`
- `new-experience`: `<path d="M-22,14 L-4,-16 L8,4 L16,-8 L26,14 Z" fill="#37323e" transform="translate(50,50)"/><circle cx="46" cy="24" r="4" fill="#6198ff"/>`
- `culture`: `<path d="M-20,10 L0,-4 L20,10 Z" fill="#37323e" transform="translate(50,54)"/><rect x="30" y="64" width="40" height="6" fill="#37323e"/>`
- `out-and-about`: `<path d="M-16,-2 h32 v34 h-32 Z" fill="#37323e" transform="translate(50,54)"/><path d="M-8,-2 a8,10 0 0 1 16,0" fill="none" stroke="#6198ff" stroke-width="4" transform="translate(50,54)"/>`
- `chill-hangout`: `<circle cx="50" cy="54" r="26" fill="none" stroke="#37323e" stroke-width="4"/><circle cx="50" cy="54" r="10" fill="#6198ff"/>`

**Worked content examples (one full subcategory per category — write these exact items, then author the remaining 38 subcategories in the same format and tone):**

`fitness` → `cardio`:
1. 10-Minute HIIT — A quick full-body burner you can do on the living room floor, no equipment needed.
2. Skip Rope for 15 Minutes — Old-school cardio that fits in a hallway and gets your heart rate up fast.
3. Jog Around the Nearest Park — No plan needed — just lace up and go at your own pace.
4. 20-Minute Dance Cardio Video — Follow along to a free video and turn your room into a mini dance floor.
5. Stair Climb Session — Find the nearest staircase and go up and down for 10 rounds.
6. Shadow Boxing — Throw combos to a playlist for 15 minutes, no gloves required.
7. Bike Around the Block — A loose, low-pressure ride just to get moving and feel the wind.
8. Jumping Jacks Ladder — Climb from 10 to 100 jumping jacks in sets, resting as needed.
9. Brisk Walk with Music — Pick a hype playlist and walk fast enough to break a light sweat.
10. Burpee Challenge — See how many clean burpees you can do in 5 minutes.

`food` → `cook-bake`:
1. Bake a Tiramisu — No-bake layers of coffee-soaked biscuits and mascarpone — impressive with minimal effort.
2. Make Fresh Pasta from Scratch — Just flour, eggs, and a rolling pin turn into dinner.
3. Bake Chocolate Chip Cookies — A classic that fills the kitchen with the best smell in the house.
4. Try a New Curry Recipe — Pick a cuisine you haven't cooked before and follow along with a video.
5. Make Bubble Tea at Home — Boil tapioca pearls and brew your own milk tea, cheaper than the shop.
6. Bake Banana Bread — The perfect use for those bananas going brown on the counter.
7. Make Homemade Pizza — Stretch your own dough and pile on whatever toppings you're craving.
8. Whip Up a Fruit Smoothie Bowl — Blend, pour, and decorate with toppings for a five-minute treat.
9. Try Making Dumplings from Scratch — Fold your own and freeze extras for later.
10. Bake a Batch of Muffins — Mix, scoop, bake — ready in under 30 minutes.

`new-experience` → `escape-room`:
1. Book a Mystery-Themed Escape Room — Gather a few friends and race the clock to solve the puzzles.
2. Try a Horror-Themed Escape Room — For when you want your heart rate up along with the puzzle-solving.
3. Do a Heist-Themed Escape Room — Team up to crack codes and "steal" your way out.
4. Try a Beginner-Friendly Escape Room — A gentler intro if it's your first time, with easier puzzles.
5. Book a 2-Player Escape Room — Some rooms are built for pairs — good for a low-key date.
6. Try a Sci-Fi Escape Room — Space stations and time-travel plots for a different vibe.
7. Do an Outdoor/City Escape Game — Solve clues around real streets instead of a single room.
8. Try a Puzzle Hunt App Instead — Free alternative — solve a location-based puzzle trail on your phone.
9. Book a Detective-Themed Room — Piece together a case file before time runs out.
10. Try a Fantasy-Themed Escape Room — Dragons, spells, and riddles for a change of pace.

`culture` → `museum-art`:
1. Visit Asian Civilisations Museum — Explore centuries of art and artefacts along the riverside.
2. Visit the National Gallery Singapore — Free admission windows make this an easy, low-cost outing.
3. Check Out ArtScience Museum — Rotating exhibits that mix art, science, and technology.
4. Explore the Peranakan Museum — A small, detailed look into Peranakan culture and heritage.
5. Visit the Singapore Art Museum — Contemporary Southeast Asian art in a compact, walkable space.
6. Drop by a Local Art Gallery Opening — Free wine, new artists, and zero pressure to buy anything.
7. Wander the National Museum of Singapore — A deep dive into the island's history, doable in an afternoon.
8. Visit the Red Dot Design Museum — A colourful look at design objects from around the world.
9. Check Out a University Art Exhibition — Student shows are often free and refreshingly experimental.
10. Visit a Photography Exhibition — Rotating shows from local and international photographers.

`out-and-about` → `sunset-watching`:
1. Watch the Sunset from a Rooftop Bar — Order one drink and stay for the view, no reservation needed.
2. Catch the Sunset at the Beach — Bring a mat, watch the sky change colour over the water.
3. Sunset from a Park Hilltop — Higher ground for an unobstructed view, totally free.
4. Watch the Sunset from a Bridge — Water reflections make for an easy, scenic spot.
5. Sunset Picnic at the Waterfront — Pack snacks and claim a spot an hour before golden hour.
6. Watch the Sunset from a Ferry or Boat — A short ride out gives you an open, unblocked horizon.
7. Sunset from an Open-Air Café — Order a coffee and let the view do the rest.
8. Cycle to a Sunset Viewpoint — Combine light exercise with the reward of a good view.
9. Sunset Photography Walk — Bring your phone or camera and chase the best light.
10. Watch the Sunset from a Rooftop Garden — Many buildings have free public sky gardens worth checking.

`chill-hangout` → `reading-study-cafe`:
1. Spend an Afternoon at a Quiet Café — Order a slow coffee and finally get through a chapter or two.
2. Try a Dedicated Study Café — Some cafés are built for focus, with plugs and good lighting at every seat.
3. Read at a Library Reading Room — Free, air-conditioned, and often underrated as a hangout spot.
4. Bring a Book to a Park Bench — Fresh air and a change of scenery from your desk.
5. Journal at a Cozy Café Corner — Order something warm and just write out your thoughts.
6. Visit a Bookstore Café — Browse new reads with a coffee in hand, no pressure to buy.
7. Do a Solo Study Session at a 24-Hour Café — Good for late-night focus when you need a change of scene.
8. Read Manga or Comics at a Themed Café — Some cafés have full shelves of comics to read while you sip.
9. Work Through a Puzzle Book at a Café — Crosswords or sudoku pair surprisingly well with coffee.
10. Have a Quiet Tea Session and Plan Your Week — Bring a planner and use the calm to get organised.

- [ ] **Step 1: Write the failing test**

Create `taxonomy.test.js`:

```js
const assert = require('assert');
const { TAXONOMY, SURPRISE_ID, getPool } = require('./taxonomy.js');

const EXPECTED_CATEGORIES = {
  'fitness': ['train-core', 'train-upper', 'train-lower', 'cardio', 'yoga-stretch', 'bouldering', 'cycling', 'badminton', 'dance'],
  'food': ['restaurant', 'cafe-hopping', 'bubble-tea', 'street-food', 'desserts', 'supper', 'cook-bake'],
  'new-experience': ['rock-climbing', 'ice-skating', 'kayaking', 'escape-room', 'adventurous'],
  'culture': ['photography-walk', 'movies', 'live-shows', 'museum-art', 'pottery-craft', 'journaling'],
  'out-and-about': ['shopping', 'thrifting', 'sunset-watching', 'explore-neighborhood', 'night-market'],
  'chill-hangout': ['board-game-cafe', 'karaoke', 'bowling', 'mini-golf', 'pool-billiards', 'arcade', 'park-hangout', 'beach', 'petting-cafe', 'plant-shopping', 'spa', 'reading-study-cafe']
};

Object.entries(EXPECTED_CATEGORIES).forEach(([categoryId, subIds]) => {
  const category = TAXONOMY.find(c => c.id === categoryId);
  assert.ok(category, `Missing category: ${categoryId}`);
  const actualSubIds = category.subcategories.map(s => s.id).sort();
  assert.deepStrictEqual(actualSubIds, [...subIds].sort(), `Subcategory mismatch for ${categoryId}`);
});

TAXONOMY.forEach(category => {
  assert.ok(category.label, `${category.id} missing label`);
  assert.ok(category.emoji, `${category.id} missing emoji`);
  assert.ok(category.icon, `${category.id} missing icon`);

  category.subcategories.forEach(sub => {
    assert.ok(sub.items.length >= 8, `${category.id}/${sub.id} has only ${sub.items.length} items, need >= 8`);
    const titles = new Set();
    sub.items.forEach(item => {
      assert.ok(item.title && item.title.trim().length > 0, `${category.id}/${sub.id} has an item with an empty title`);
      assert.ok(item.description && item.description.trim().length > 0, `${category.id}/${sub.id} has an item with an empty description`);
      assert.ok(!titles.has(item.title), `${category.id}/${sub.id} has a duplicate title: ${item.title}`);
      titles.add(item.title);
    });
  });
});

const fitnessCardio = getPool(TAXONOMY, 'fitness', 'cardio');
assert.ok(fitnessCardio.length >= 8);
fitnessCardio.forEach(item => {
  assert.strictEqual(item.categoryId, 'fitness');
  assert.strictEqual(item.categoryLabel, 'Fitness & Move');
  assert.strictEqual(item.subcategoryId, 'cardio');
  assert.ok(item.title && item.description);
});

const totalItems = TAXONOMY.reduce((sum, c) => sum + c.subcategories.reduce((s2, sub) => s2 + sub.items.length, 0), 0);
const surprisePool = getPool(TAXONOMY, SURPRISE_ID, null);
assert.strictEqual(surprisePool.length, totalItems);

assert.deepStrictEqual(getPool(TAXONOMY, 'not-a-category', 'x'), []);
assert.deepStrictEqual(getPool(TAXONOMY, 'fitness', 'not-a-subcategory'), []);

console.log('All taxonomy.js tests passed.');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node taxonomy.test.js`
Expected: `Error: Cannot find module './taxonomy.js'`

- [ ] **Step 3: Write `taxonomy.js`**

```js
const SURPRISE_ID = 'surprise';

const TAXONOMY = [
  {
    id: 'fitness',
    label: 'Fitness & Move',
    emoji: '🏋️',
    icon: '<rect x="20" y="46" width="10" height="14" rx="3" fill="#37323e"/><rect x="70" y="46" width="10" height="14" rx="3" fill="#37323e"/><rect x="30" y="50" width="40" height="6" rx="3" fill="#6198ff"/>',
    subcategories: [
      { id: 'train-core', label: 'Train Core', items: [ /* ~10 items, same format as cardio below */ ] },
      { id: 'train-upper', label: 'Train Upper', items: [ /* ~10 items */ ] },
      { id: 'train-lower', label: 'Train Lower', items: [ /* ~10 items */ ] },
      { id: 'cardio', label: 'Cardio', items: [
        { title: '10-Minute HIIT', description: 'A quick full-body burner you can do on the living room floor, no equipment needed.' },
        { title: 'Skip Rope for 15 Minutes', description: 'Old-school cardio that fits in a hallway and gets your heart rate up fast.' },
        { title: 'Jog Around the Nearest Park', description: 'No plan needed — just lace up and go at your own pace.' },
        { title: '20-Minute Dance Cardio Video', description: 'Follow along to a free video and turn your room into a mini dance floor.' },
        { title: 'Stair Climb Session', description: 'Find the nearest staircase and go up and down for 10 rounds.' },
        { title: 'Shadow Boxing', description: 'Throw combos to a playlist for 15 minutes, no gloves required.' },
        { title: 'Bike Around the Block', description: 'A loose, low-pressure ride just to get moving and feel the wind.' },
        { title: 'Jumping Jacks Ladder', description: 'Climb from 10 to 100 jumping jacks in sets, resting as needed.' },
        { title: 'Brisk Walk with Music', description: 'Pick a hype playlist and walk fast enough to break a light sweat.' },
        { title: 'Burpee Challenge', description: 'See how many clean burpees you can do in 5 minutes.' }
      ] },
      { id: 'yoga-stretch', label: 'Yoga/Stretch', items: [ /* ~10 items */ ] },
      { id: 'bouldering', label: 'Bouldering/Climbing Gym', items: [ /* ~10 items */ ] },
      { id: 'cycling', label: 'Cycling', items: [ /* ~10 items */ ] },
      { id: 'badminton', label: 'Badminton/Sports Court', items: [ /* ~10 items */ ] },
      { id: 'dance', label: 'Dance', items: [ /* ~10 items */ ] }
    ]
  },
  // ... food, new-experience, culture, out-and-about, chill-hangout categories,
  // each with their icon from the list above and every subcategory from the
  // full list, populated the same way as fitness/cardio above.
];

function enrichItem(item, category, sub) {
  return {
    title: item.title,
    description: item.description,
    categoryId: category.id,
    categoryLabel: category.label,
    categoryIcon: category.icon,
    subcategoryId: sub.id,
    subcategoryLabel: sub.label
  };
}

function getPool(taxonomy, categoryId, subcategoryId) {
  if (categoryId === SURPRISE_ID) {
    return taxonomy.flatMap(category =>
      category.subcategories.flatMap(sub =>
        sub.items.map(item => enrichItem(item, category, sub))
      )
    );
  }
  const category = taxonomy.find(c => c.id === categoryId);
  if (!category) return [];
  const sub = category.subcategories.find(s => s.id === subcategoryId);
  if (!sub) return [];
  return sub.items.map(item => enrichItem(item, category, sub));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAXONOMY, SURPRISE_ID, getPool };
}
```

Replace every `/* ~10 items */` placeholder shown above with real, fully authored items before running the test — the test will fail on any subcategory left under 8 items. Author all 44 subcategories (worked examples for 6 of them are given above) following the exact tone/format rules in Global Constraints.

- [ ] **Step 4: Run test to verify it passes**

Run: `node taxonomy.test.js`
Expected: `All taxonomy.js tests passed.`

- [ ] **Step 5: Commit**

```bash
git add taxonomy.js taxonomy.test.js
git commit -m "feat: add taxonomy data module with curated activity pool"
```

---

### Task 2: Pool/pick logic

**Files:**
- Create: `mood-check.js`
- Test: `mood-check.test.js`

**Interfaces:**
- Consumes: nothing (pure, taxonomy-agnostic — operates on any array passed in).
- Produces: `pickRandomItem(pool, rng = Math.random)` → returns a random element of `pool`, or `null` if `pool` is empty. `rng` is injectable for deterministic tests.

- [ ] **Step 1: Write the failing test**

Create `mood-check.test.js`:

```js
const assert = require('assert');
const { pickRandomItem } = require('./mood-check.js');

const pool = [{ title: 'A' }, { title: 'B' }, { title: 'C' }];

assert.strictEqual(pickRandomItem(pool, () => 0).title, 'A');
assert.strictEqual(pickRandomItem(pool, () => 0.999999).title, 'C');
assert.strictEqual(pickRandomItem([], () => 0), null);

const anyItem = pickRandomItem(pool);
assert.ok(pool.includes(anyItem));

console.log('All mood-check.js tests passed.');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node mood-check.test.js`
Expected: `Error: Cannot find module './mood-check.js'`

- [ ] **Step 3: Write `mood-check.js`**

```js
/** Pick one random item from a pool. rng is injectable for testing. */
function pickRandomItem(pool, rng = Math.random) {
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(rng() * pool.length)];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pickRandomItem };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node mood-check.test.js`
Expected: `All mood-check.js tests passed.`

- [ ] **Step 5: Commit**

```bash
git add mood-check.js mood-check.test.js
git commit -m "feat: add pool-picking logic for mood-check"
```

---

### Task 3: Session storage wrapper

**Files:**
- Create: `mood-session.js`
- Test: `mood-session.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `getSessionMood(storage = sessionStorage)` → `string|null`; `getSessionSubcategory(storage = sessionStorage)` → `string|null`; `setSessionMood(categoryId, subcategoryId, storage = sessionStorage)` → `void` (pass `subcategoryId` as `null`/falsy for Surprise Me — this clears any existing subcategory key); `clearSessionMood(storage = sessionStorage)` → `void`.

- [ ] **Step 1: Write the failing test**

Create `mood-session.test.js`:

```js
const assert = require('assert');
const { getSessionMood, getSessionSubcategory, setSessionMood, clearSessionMood } = require('./mood-session.js');

function fakeStorage() {
  const data = {};
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = v; },
    removeItem: (k) => { delete data[k]; }
  };
}

let storage = fakeStorage();
assert.strictEqual(getSessionMood(storage), null);
assert.strictEqual(getSessionSubcategory(storage), null);

setSessionMood('fitness', 'cardio', storage);
assert.strictEqual(getSessionMood(storage), 'fitness');
assert.strictEqual(getSessionSubcategory(storage), 'cardio');

storage = fakeStorage();
setSessionMood('fitness', 'cardio', storage);
setSessionMood('surprise', null, storage);
assert.strictEqual(getSessionMood(storage), 'surprise');
assert.strictEqual(getSessionSubcategory(storage), null);

clearSessionMood(storage);
assert.strictEqual(getSessionMood(storage), null);
assert.strictEqual(getSessionSubcategory(storage), null);

console.log('All mood-session.js tests passed.');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node mood-session.test.js`
Expected: `Error: Cannot find module './mood-session.js'`

- [ ] **Step 3: Write `mood-session.js`**

```js
const SESSION_MOOD_KEY = 'sessionMood';
const SESSION_SUBCATEGORY_KEY = 'sessionSubcategory';

function getSessionMood(storage = sessionStorage) {
  return storage.getItem(SESSION_MOOD_KEY);
}

function getSessionSubcategory(storage = sessionStorage) {
  return storage.getItem(SESSION_SUBCATEGORY_KEY);
}

function setSessionMood(categoryId, subcategoryId, storage = sessionStorage) {
  storage.setItem(SESSION_MOOD_KEY, categoryId);
  if (subcategoryId) {
    storage.setItem(SESSION_SUBCATEGORY_KEY, subcategoryId);
  } else {
    storage.removeItem(SESSION_SUBCATEGORY_KEY);
  }
}

function clearSessionMood(storage = sessionStorage) {
  storage.removeItem(SESSION_MOOD_KEY);
  storage.removeItem(SESSION_SUBCATEGORY_KEY);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getSessionMood, getSessionSubcategory, setSessionMood, clearSessionMood, SESSION_MOOD_KEY, SESSION_SUBCATEGORY_KEY };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node mood-session.test.js`
Expected: `All mood-session.js tests passed.`

- [ ] **Step 5: Commit**

```bash
git add mood-session.js mood-session.test.js
git commit -m "feat: add sessionStorage wrapper for mood-check state"
```

---

### Task 4: Route Register/Login/Guest straight to home

**Files:**
- Modify: `index.html:462`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing new — this only removes the last live link to `onboarding1.html`.

- [ ] **Step 1: Update the Register handler**

In `index.html`, find this line inside the `register-panel` submit handler:

```js
    if (emailValid && passwordValid && confirmValid) window.location.href = 'onboarding1.html';
```

Replace with:

```js
    if (emailValid && passwordValid && confirmValid) window.location.href = 'home-single.html';
```

(Login at line 441 and Guest at line 443 already go to `home-single.html` — no change needed there.)

- [ ] **Step 2: Manually verify**

Run: `python3 -m http.server 8000` from the project root, then in a browser:
- Go to `http://localhost:8000/index.html`, fill in a valid email/password/confirm on the Register panel, submit.
Expected: lands on `home-single.html`, not `onboarding1.html`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: route Register straight to home, skip removed onboarding"
```

---

### Task 5: Mood-check UI in home-single.html

**Files:**
- Modify: `home-single.html` (style block, markup, script includes)

**Interfaces:**
- Consumes: `TAXONOMY`, `SURPRISE_ID` (Task 1); `getSessionMood`, `getSessionSubcategory`, `setSessionMood`, `clearSessionMood` (Task 3).
- Produces: DOM elements `#mood-picker`, `#mood-step1`, `#mood-step2`, `#mood-pill`, `#mood-pill-text`, `#mood-change-btn`, all wired and functional. `#pick-card` (`card` in the existing script) stays hidden until a mood is confirmed for the session.

- [ ] **Step 1: Add script includes**

In `home-single.html`, immediately before the existing `<script>` tag (currently line 188), add:

```html
  <script src="taxonomy.js"></script>
  <script src="mood-check.js"></script>
  <script src="mood-session.js"></script>
```

- [ ] **Step 2: Add mood-check CSS**

In `home-single.html`'s `<style>` block, immediately before the closing `</style>` tag, add:

```css
  .mood-picker { margin-bottom: var(--space-5); }
  .mood-picker .pick-label { margin-bottom: var(--space-3); }
  #mood-step2 { margin-top: var(--space-3); }

  .mood-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12.5px;
    color: var(--color-text-soft);
    margin-bottom: var(--space-3);
  }
  .mood-change-btn {
    background: none;
    border: none;
    padding: 0;
    color: var(--color-accent);
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
  }
```

- [ ] **Step 3: Add mood-check markup**

In `home-single.html`, immediately after the closing `</div>` of `.today-widget` and before `<p class="pick-label" id="pick-label">Ready when you are</p>`, add:

```html
    <div class="mood-picker hidden" id="mood-picker">
      <p class="pick-label">What are you feeling today?</p>
      <div class="chip-grid" id="mood-step1"></div>
      <div class="chip-grid hidden" id="mood-step2"></div>
    </div>

    <div class="mood-pill hidden" id="mood-pill">
      <span id="mood-pill-text"></span>
      <button type="button" class="mood-change-btn" id="mood-change-btn">change</button>
    </div>
```

Then change the existing pick-card opening tag from:

```html
    <div class="pick-card" id="pick-card">
```

to:

```html
    <div class="pick-card hidden" id="pick-card">
```

- [ ] **Step 4: Wire the mood-check logic**

In `home-single.html`'s inline `<script>` block, immediately after the line `const iconWrap = document.getElementById('pick-icon-wrap');` and its neighboring `const card = ...`, `const spinBtn = ...`, `const spinAgainBtn = ...`, `const pickLabel = ...` declarations, add:

```js
    // ---- Mood-check: mood/subcategory selection, sticky per session ----
    const moodPicker = document.getElementById('mood-picker');
    const moodStep1 = document.getElementById('mood-step1');
    const moodStep2 = document.getElementById('mood-step2');
    const moodPill = document.getElementById('mood-pill');
    const moodPillText = document.getElementById('mood-pill-text');

    function renderStep1() {
      moodStep1.innerHTML = TAXONOMY.map(category =>
        `<button type="button" class="chip" data-category-id="${category.id}">${category.emoji} ${category.label}</button>`
      ).join('') + `<button type="button" class="chip" data-category-id="${SURPRISE_ID}">🎲 Surprise Me</button>`;

      moodStep1.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const categoryId = btn.dataset.categoryId;
          if (categoryId === SURPRISE_ID) {
            confirmMood(SURPRISE_ID, null);
          } else {
            renderStep2(categoryId);
          }
        });
      });
    }

    function renderStep2(categoryId) {
      const category = TAXONOMY.find(c => c.id === categoryId);
      moodStep2.innerHTML = category.subcategories.map(sub =>
        `<button type="button" class="chip" data-subcategory-id="${sub.id}">${sub.label}</button>`
      ).join('');
      moodStep2.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => confirmMood(categoryId, btn.dataset.subcategoryId));
      });
      moodStep1.classList.add('hidden');
      moodStep2.classList.remove('hidden');
    }

    function confirmMood(categoryId, subcategoryId) {
      setSessionMood(categoryId, subcategoryId);
      showMoodPill();
      moodPicker.classList.add('hidden');
      card.classList.remove('hidden');
    }

    function showMoodPill() {
      const categoryId = getSessionMood();
      const subcategoryId = getSessionSubcategory();
      const category = TAXONOMY.find(c => c.id === categoryId);
      const label = categoryId === SURPRISE_ID
        ? '🎲 Surprise Me'
        : `${category.emoji} ${category.label} → ${category.subcategories.find(s => s.id === subcategoryId).label}`;
      moodPillText.textContent = label;
      moodPill.classList.remove('hidden');
    }

    document.getElementById('mood-change-btn').addEventListener('click', () => {
      clearSessionMood();
      card.classList.add('hidden');
      card.classList.remove('revealed');
      moodPill.classList.add('hidden');
      moodStep2.classList.add('hidden');
      moodStep1.classList.remove('hidden');
      moodPicker.classList.remove('hidden');
      currentPick = null;
    });

    renderStep1();
    if (getSessionMood()) {
      showMoodPill();
      card.classList.remove('hidden');
    } else {
      moodPicker.classList.remove('hidden');
    }
```

Note: the `mood-change-btn` click handler references `currentPick`, which is declared with `let currentPick = null;` later in the same script block (Task 6 keeps that declaration in place, unchanged). This is safe despite appearing before its declaration in the file: the assignment only happens inside a click callback, which can't fire until the browser has finished running the whole script once (so `currentPick` is already declared and in scope by the time a user can click anything) — `let` isn't hoisted into a usable state, but nothing here reads or writes it until after that first pass completes.

- [ ] **Step 5: Manually verify**

Run: `python3 -m http.server 8000` from the project root, then in a browser:
- Go to `http://localhost:8000/home-single.html` directly (simulating first visit this session).
Expected: mood-picker shows 7 chips (6 categories + Surprise Me), pick-card is hidden.
- Click "🏋️ Fitness & Move".
Expected: Step 1 hides, Step 2 shows 9 subcategory chips (Train Core, Train Upper, Train Lower, Cardio, Yoga/Stretch, Bouldering/Climbing Gym, Cycling, Badminton/Sports Court, Dance).
- Click "Cardio".
Expected: mood-picker hides, pick-card appears with the Spin button, mood-pill shows "🏋️ Fitness & Move → Cardio · change".
- Click "change".
Expected: back to the Step 1 chip screen, pick-card and pill hidden again.
- Reload the page after re-selecting a mood.
Expected: mood-picker stays hidden and the pill/pick-card show immediately (sessionStorage persisted the choice) — until the tab is closed and reopened, at which point it resets to Step 1.

- [ ] **Step 6: Commit**

```bash
git add home-single.html
git commit -m "feat: add mood-check UI to home screen"
```

---

### Task 6: Wire Spin to the mood-narrowed pool

**Files:**
- Modify: `home-single.html` (script block)
- Modify: `activity-detail.html:109`

**Interfaces:**
- Consumes: `getPool` (Task 1), `pickRandomItem` (Task 2), `getSessionMood`/`getSessionSubcategory` (Task 3).
- Produces: `currentPool()` → `Array<enriched item>`; `toPick(item)` → `{icon, title, desc, tags}` (the shape `activity-detail.html`, `directions.html`, and `history.html` already expect).

- [ ] **Step 1: Replace the sample-picks block with taxonomy-driven pool logic**

In `home-single.html`'s inline `<script>` block, delete the `// ---- Sample picks (placeholder data) ----` array (the `const picks = [...]` block) and delete the `pickPersonalized()` function entirely (it read `localStorage.userInterests`, which no longer exists per the spec).

Replace the existing `runSpin()` function with:

```js
    function currentPool() {
      return getPool(TAXONOMY, getSessionMood(), getSessionSubcategory());
    }

    function toPick(item) {
      return {
        icon: item.categoryIcon,
        title: item.title,
        desc: item.description,
        tags: [item.categoryLabel, item.subcategoryLabel]
      };
    }

    function runSpin() {
      const pool = currentPool();
      if (pool.length === 0) return;

      spinBtn.disabled = true;
      spinAgainBtn.disabled = true;
      pickLabel.textContent = 'Spinning...';
      iconWrap.classList.add('shuffling');

      const finalPick = toPick(pickRandomItem(pool));
      const delays = [80, 80, 90, 100, 120, 150, 190, 240, 300, 380];
      let i = 0;

      function tick() {
        setIcon(toPick(pickRandomItem(pool)));
        i++;
        if (i < delays.length) {
          setTimeout(tick, delays[i]);
        } else {
          finishSpin(finalPick);
        }
      }
      tick();
    }
```

`setIcon()`, `finishSpin()`, the `spinBtn`/`spinAgainBtn` listeners, and the `lets-go-btn` listener are unchanged — they already operate on the `{icon, title, desc, tags}` shape, which `toPick()` now produces from taxonomy items instead of the old hardcoded array.

- [ ] **Step 2: Fix the stale "your interests" copy in activity-detail.html**

In `activity-detail.html`, find:

```js
    document.getElementById('why-text').innerHTML = `Matched to your interests — you told us you're into <strong>${topTag.replace(/^[^\w]+/, '')}</strong>, and this fits your usual budget and time preferences too.`;
```

Replace with:

```js
    document.getElementById('why-text').innerHTML = `Matched to your mood — you're feeling into <strong>${topTag.replace(/^[^\w]+/, '')}</strong> right now, and this fits.`;
```

(`topTag` still resolves correctly — `pick.tags` is now `[categoryLabel, subcategoryLabel]`, e.g. `['Fitness & Move', 'Cardio']`, and the existing `.find(t => /[a-zA-Z]/.test(t))` logic picks the first one unchanged.)

- [ ] **Step 3: Manually verify end-to-end**

Run: `python3 -m http.server 8000` from the project root, then in a browser:
- Go to `http://localhost:8000/home-single.html`, pick Fitness & Move → Cardio.
- Click Spin.
Expected: icon shuffles, then lands on a title/description matching one of the 10 Cardio items authored in Task 1, tags show "Fitness & Move" and "Cardio".
- Click Spin Again several times.
Expected: different Cardio items appear (still only from the Cardio pool, not other categories).
- Click Let's Go.
Expected: `activity-detail.html` shows the same title/description/tags, and the why-card reads "Matched to your mood — you're feeling into **Fitness & Move** right now, and this fits." (or Cardio, whichever tag is picked by the existing `find` logic).
- Go back to `home-single.html`, click "change" on the mood pill, pick "🎲 Surprise Me".
- Click Spin several times.
Expected: picks now span multiple categories (not just Fitness), each still showing a correct matching icon/tags pair for whichever category it came from.

- [ ] **Step 4: Commit**

```bash
git add home-single.html activity-detail.html
git commit -m "feat: wire Spin to the mood-narrowed taxonomy pool"
```

---

### Task 7: End-to-end verification of the full pivot flow

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Run the full user journey in a browser**

Run: `python3 -m http.server 8000` from the project root (if not already running), then walk through:
1. `http://localhost:8000/index.html` → Register with a valid email/password → lands on `home-single.html` (not onboarding).
2. Mood-check shows Step 1 → pick a category → Step 2 subcategories appear → pick one → pick-card with Spin appears, pill shows the right mood/subcategory.
3. Spin → shuffles → lands on a real item from that subcategory's pool.
4. Let's Go → `activity-detail.html` shows matching content, "Matched to your mood" copy (not "your interests").
5. "Let's Do This" → back on `home-single.html`, ongoing-activity card shows instead of the pick-card/mood-check.
6. "Done" on the ongoing card → activity logs to History (`profile.html` → History) and the mood-check/pick-card UI reappears (mood still sticky for the session).
7. Reload the tab → mood/pill state persists (sessionStorage).
8. Open a fresh tab (or clear sessionStorage via devtools) to the same URL → mood-check resets to Step 1, confirming the "once per session" behavior.

Expected: no console errors at any step (check via browser devtools), and every screen matches the flow described in `docs/superpowers/specs/2026-07-31-mood-check-taxonomy-design.md` §2.

- [ ] **Step 2: Run all three test files together as a final regression check**

Run:
```bash
node taxonomy.test.js && node mood-check.test.js && node mood-session.test.js
```
Expected: all three print their "All ... tests passed." lines with no errors.
