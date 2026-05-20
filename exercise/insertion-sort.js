
/**
 * @param {Array} arr 
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let cv = arr[i];
    for (let j = i - 1; j > -1 && arr[j] > cv; j--) {
      arr[j + 1] = arr[j]
      arr[j + 1] = cv;
    }
  }
  return arr;
}

console.log(insertionSort([4, 3, 8, 1]));