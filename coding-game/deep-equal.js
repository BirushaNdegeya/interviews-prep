/*
Problem: Implement a precise deep equality checking function areDeepEqual(obj1, obj2) that compares primitive types, nested objects, and arrays structurally to determine if they are identical in value and hierarchy.
Test Cases to Pass:
JavaScript
*/
/**
 * 
 * @param {Object} refA 
 * @param {Object} refB 
 */
function areDeepEqual(refA, refB) {
  const akeys = Object.keys(refA);
  console.log(akeys);
}

const configA = { pairs: ['BTC', 'ETH'], params: { limit: 10 } };
const configB = { pairs: ['BTC', 'ETH'], params: { limit: 10 } };
const configC = { pairs: ['BTC', 'ETH'], params: { limit: 20 } };
const configD = { pairs: ['ETH', 'BTC'], params: { limit: 10 } };

console.log(areDeepEqual(configA, configB));
// Expected: true

console.log(areDeepEqual(configA, configC));
// Expected: false (Different nested values)

console.log(areDeepEqual(configA, configD));
// Expected: false (Array elements are out of order)

console.log(areDeepEqual({ a: 1, b: null }, { a: 1, b: undefined }));
// Expected: false (Strict type differences)