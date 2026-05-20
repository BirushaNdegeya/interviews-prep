// Frequency counting
/*
1. Write a function called same, which accepets two arrays. The function should return true if every value in the array has it's corresping value squared in the array. The frequency of values must be the same
*/
/**
 *
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
// Approch cherche l'index correct | En utilisant splice | Quadratic times
// function same(arr1, arr2) {
//   if (arr1.length != arr2.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     const squared = arr1[i] ** 2;
//     const cIndex = arr2.indexOf(squared);
//     if (cIndex === -1) return false;
//     arr2.splice(cIndex, 1);
//   }
//   return true;
// }

// with 2 foor loop I will test it tomorrow
// function same(arr1, arr2) {
//   if (arr1.length != arr2.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     const squared = arr1[i] ** 2;
//     for (let j = 0; i < arr2.length;j++) {
//       if (squared === arr2[j]) {
//         arr2.splice(j, 1);
//       }
//       // if (cIndex === -1) return false;
//     }
//   }
//   return true;
// }

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const fArr1 = {};
  const fArr2 = {};
  for (let i = 0; i < arr1.length; i++) {
    fArr1[arr1[i]] = (fArr1[arr1[i]] || 0) + 1;
    fArr2[arr2[i]] = (fArr2[arr2[i]] || 0) + 1;
  }


    for (let i = 0; i < fArr1.length; i++) {
    console.log(fArr1[i][0])
  }
  for (let key in fArr1) {
    if (!(key ** 2 in fArr2)) return false;
    if (fArr2[key ** 2] !== fArr1[key]) return false;
  }
  // other method



  return true;
}

console.log(same([1, 2, 1], [4, 4, 1])); // false (wrong frequency)
console.log(same([1, 2, 3], [4, 1, 9])); // true
console.log(same([1, 2, 3], [1, 9])); // false (different lengths)
console.log(same([2, 3, 4], [4, 9, 16])); // true
console.log(same([1, 2, 3, 2], [9, 1, 4, 4])); // true
