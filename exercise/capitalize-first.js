/*
capitalizeFirst
Instructions

Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first letter of each string in the array.
*/

/**
 * Capitalize First
 * @param {Array} arr 
 */
function capitalizeFirst(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
  }
  return arr;
}

console.log(capitalizeFirst(['car', 'taco', 'banana'])); // toEqual(['Car','Taco','Banana']);