/*
Divide and Conquer - sortedFrequency
Instructions

Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array
*/

/**
 * @param {Array} arr 
 * @param {Number} target 
 */
function sortedFrequency(arr, target) {
  let x = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) counter++;
  }
  return counter;
}

console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)) // 4 
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)) // 1 
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1)) // 2 
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)) // -1
