
/**
 * Buble Sort Algo
 * @param {Array} arr 
 */
function bubleSort(arr) {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // SWAP
        let swap = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = swap
        noSwaps = false
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

console.log(bubleSort([4, 2, 3, 1, 8]))