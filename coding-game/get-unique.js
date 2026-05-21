/**
 * Unique Item Algo
 * @param {Array} arr 
 */
function getUniqueItems(arr) {
  if (Array.isArray(arr)) {
    return [...new Set(arr)];
  } else {
    return [];
  }
}

console.log(getUniqueItems([1, 2, 2, 3, 4, 4, 5])); 
// Expected: [1, 2, 3, 4, 5]

console.log(getUniqueItems(['gold', 'btc', 'gold', 'eth', 'btc'])); 
// Expected: ['gold', 'btc', 'eth']

console.log(getUniqueItems([])); 
// Expected: []

console.log(getUniqueItems("not an array")); 
// Expected: []