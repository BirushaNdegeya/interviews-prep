/**
 *
 * @param {Array} arr1
 * @param {Array} arr2
 */

function copyArray(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    arr2[i] = arr1[i];
  }
}

const arrayOne = [1, 2, 3, 4, 5];
const arrayTwo = [];
copyArray(arrayOne, arrayTwo);
arrayOne[5] = 10;
console.log(arrayOne);
console.log(arrayTwo);
