
import { setupNavigation, updateLastModified } from './utils.js';

function init() {
  setupNavigation();
  updateLastModified();
}

document.addEventListener('DOMContentLoaded', init);