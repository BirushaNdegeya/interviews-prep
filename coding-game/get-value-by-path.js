/*
Problem: Write a reliable function getValueByPath(obj, path) that accepts an object and a path string separated by periods (e.g., 'user.settings.theme'). Return the corresponding value if it exists, or return undefined safely without throwing an execution error if any nested level is missing or null.
Test Cases to Pass:
JavaScript
*/
/**
 * Get Value by Path Algo
 * @param {Object} obj 
 * @param {String} path 
 * @returns { String | undefined }
 */
function getValueByPath(obj, path) {
  // Handle empty path
  if (!path || path.length === 0) return undefined;

  const arrProp = path.split('.');
  let current = obj;
  let left = 0;

  while (left < arrProp.length) {
    // Check if current is null/undefined OR the property doesn't exist
    if (current === null || current === undefined || !current.hasOwnProperty(arrProp[left])) {
      return undefined;
    }

    // Get the value at current property
    current = current[arrProp[left]];

    // If we've reached the end of the path, return the value
    if (left === arrProp.length - 1) {
      return current;
    }

    left++;
  }

  return undefined;
}
const data = { config: { trading: { symbol: 'XAUUSD', mode: 'Scalping' } }, active: null };

console.log(getValueByPath(data, 'config.trading.symbol'));
// Expected: 'XAUUSD'

console.log(getValueByPath(data, 'config.indicators.atr'));
// Expected: undefined

console.log(getValueByPath(data, 'active.subProperty'));
// Expected: undefined (Should not crash on null target)

console.log(getValueByPath(data, ''));
// Expected: undefined