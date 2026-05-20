/*
Divide and Conquer - countZeroes
Instructions

Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

countZeroes([1,1,1,1,0,0]) // 2
countZeroes([1,0,0,0,0]) // 4
countZeroes([0,0,0]) // 3
countZeroes([1,1,1,1]) // 0

Time Complexity - O(log n)
*/

/**
 * Count Zeroes Algo
 * @param {Array} arr 
 */
function countZeroes(arr) {
  let ac = 0;
  let last = arr.length - 1;
  while (arr[last] === 0) {
    ac++;
    last--;
  }
  return ac;
}


console.log(countZeroes([1, 1, 1, 1, 0, 0])) // toBe(2)
console.log(countZeroes([1, 0, 0, 0, 0])) // toBe(4)
console.log(countZeroes([0, 0, 0])) // toBe(3)
console.log(countZeroes([1, 1, 1, 1])) // toBe(0)