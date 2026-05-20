
/**
 * @param {Array} arr 
 */
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      let swap = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = swap;
    }
  }
}


console.log(selectionSort([4, 8, 3, 4, 5, 9]))