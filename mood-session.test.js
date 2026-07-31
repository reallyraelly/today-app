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
