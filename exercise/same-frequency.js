/*
Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities:

Time: O(N)

Sample Input:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false

 
 */

/**
 * 
 * @param {Number} n1 
 * @param {Number} n2 
 */
function sameFrequency(n1, n2) {
  const n1str = n1.toString();
  const n2str = n2.toString();
  if (n1str.length !== n2str.length) return false;

  const lookup = {};
  for (let i = 0; i < n1str.length; i++) {
    const item = n1str[i];
    lookup[item] = (lookup[item] || 0) + 1;
  }

  for (let i = 0; i < n2str.length; i++) {
    const item = n2str[i];
    if (!lookup[item]) {
      return false;
    } else {
      lookup[item] -= 1;
    }
  }
  return true;

}

console.log(sameFrequency(182, 281)) // true
console.log(sameFrequency(34, 14))// false
console.log(sameFrequency(3589578, 5879385)) // true
console.log(sameFrequency(22, 222))// false