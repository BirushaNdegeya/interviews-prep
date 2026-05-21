/**
 * Not Use Flat() Algo
 * @param {Array} arr 
 */
function flattenAndSortUnique(arr) {
  const set = new Set();
  const re = /[0-9]+/
  function flatten(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flatten(arr[i]);
      } else {
        if (re.test(arr[i])) {
          set.add(arr[i]);
        }
      }
    }
  }
  flatten(arr);
  return [...set].sort((a,b) => a - b);

}

console.log(flattenAndSortUnique([3, [1, [4, 1]], [5, [3, 9, [2]]]]));
// Expected: [1, 2, 3, 4, 5, 9]

console.log(flattenAndSortUnique([[-5, -10], [-5, [100, 42, [0]]]]));
// Expected: [-10, -5, 0, 42, 100]

console.log(flattenAndSortUnique([7, [], [7, [7]]]));
// Expected: [7]

console.log(flattenAndSortUnique([1, [NaN, "text", 2], 3]));
// Expected: [1, 2, 3] (Filters out non-numeric types safely)