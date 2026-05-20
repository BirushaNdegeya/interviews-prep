/*
reverse
Instructions

Write a recursive function called reverse which accepts a string and returns a new string in reverse.
*/

/**
 * Reverse Algo
 * @param {String} str 
 */
function reverse(str) {
  if (str.length <= 1) return str;
  return str[str.length - 1] + reverse(str.slice(0, -1))
}

console.log(reverse('awesome')) // toEqual('emosewa')
console.log(reverse('rithmschool')) // toEqual('loohcsmhtir')