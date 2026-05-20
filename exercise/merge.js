
/**
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
function merge(arr1, arr2) {
  let o = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[j]) {
      o.push(arr1[i]);
      i++;
    } else {
      o.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    o.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    o.push(arr2[j]);
    j++;
  }
  return o;
}


console.log(merge([1, 10, 50], [2, 14, 99, 100]))