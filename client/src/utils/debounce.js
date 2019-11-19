/**
 *
 * @param {function} func
 * @param {Number} wait
 * @param {String} q
 */
export default function debounce(func, wait, q) {
  if (!debounce.lastcalled) {
    debounce.lastcalled = new Date().getTime();
    debounce.timeout = setTimeout(() => func(q), wait);
    return;
  }
  if (new Date().getTime() - debounce.lastcalled < wait) {
    clearTimeout(debounce.timeout);
    debounce.lastcalled = new Date().getTime();
    debounce.timeout = setTimeout(() => func(q), wait);
    return;
  }
  debounce.lastcalled = new Date().getTime();
  setTimeout(() => func(q), wait);
}
