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
