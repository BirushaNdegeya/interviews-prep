/*
flatten
Instructions

Write a recursive function called flatten which accepts an array of arrays and returns a new array with all values flattened.
*/

/**
 * Flatten Array
 * @param {Array} arr 
 */
function flatten(arr) {
  return `[${arr.join(',')}]`
}


console.log(flatten([1, 2, 3, [4, 5]])); // toEqual([1, 2, 3, 4, 5])
console.log(flatten([1, [2, [3, 4], [[5]]]])); // toEqual([1, 2, 3, 4, 5])
console.log(flatten([[1], [2], [3]])); // toEqual([1, 2, 3])
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // toEqual([1, 2, 3])