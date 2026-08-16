const assert = require('assert');
const { pickRandomItem } = require('./mood-check.js');

const pool = [{ title: 'A' }, { title: 'B' }, { title: 'C' }];

assert.strictEqual(pickRandomItem(pool, () => 0).title, 'A');
assert.strictEqual(pickRandomItem(pool, () => 0.999999).title, 'C');
assert.strictEqual(pickRandomItem([], () => 0), null);

const anyItem = pickRandomItem(pool);
assert.ok(pool.includes(anyItem));

console.log('All mood-check.js tests passed.');
