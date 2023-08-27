'use strict';

// Save data to LocalStorage with key:value arguments
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Get data from LocalStorage with key
function getFromStorage(key) {
  return localStorage.getItem(key);
}
