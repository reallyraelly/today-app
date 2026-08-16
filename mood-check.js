/** Pick one random item from a pool. rng is injectable for testing. */
function pickRandomItem(pool, rng = Math.random) {
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(rng() * pool.length)];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pickRandomItem };
}
