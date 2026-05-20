/**
 * 
 * @param {Array} arr 
 */

function uniqueValue(arr) {
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] != arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

console.log(uniqueValue([1, 1, 1, 1, 2, 2]));
console.log(uniqueValue([-2, -1, -1, 0, 1]))