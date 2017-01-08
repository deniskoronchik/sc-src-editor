export function callIfExists(func, ...args) {
    return (typeof func === 'function') && func(...args);
}

/* Common function to order elements in array by _order property.
 * Useful for sorting UI list elements to make a pretty order.
 * If elements with null _order will be placed at the end
 */
export function orderCompare(a, b) {
  if (!a._order && b._order) {
    return 1;
  } else if (a._order && !b._order) {
    return -1;
  } else if (!a._order && !b._order) {
    return 0;
  }

  if (a._order < b._order) {
    return -1;
  } else if (a._order > b._order) {
    return 1;
  }
  return 0;
}
