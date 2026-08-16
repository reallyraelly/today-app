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
  assert.ok(typeof item.categoryIcon === 'string' && item.categoryIcon.length > 0);
  assert.strictEqual(item.subcategoryLabel, 'Cardio');
});

const totalItems = TAXONOMY.reduce((sum, c) => sum + c.subcategories.reduce((s2, sub) => s2 + sub.items.length, 0), 0);
const surprisePool = getPool(TAXONOMY, SURPRISE_ID, null);
assert.strictEqual(surprisePool.length, totalItems);

assert.deepStrictEqual(getPool(TAXONOMY, 'not-a-category', 'x'), []);
assert.deepStrictEqual(getPool(TAXONOMY, 'fitness', 'not-a-subcategory'), []);
assert.deepStrictEqual(getPool(TAXONOMY, null, null), []);

console.log('All taxonomy.js tests passed.');
