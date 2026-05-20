/*
recursiveRange
Instructions

Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function 
*/

/**
 * Recursive Range Algo
 * @param {Number} n 
 */
function recursiveRange(n) {
  if (n === 0) return 0;
  return n + recursiveRange(n - 1);
}

console.log(recursiveRange(6)) // toBe(21)
console.log(recursiveRange(10)) // toBe(55)