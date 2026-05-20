/**
 * 
 * @param { Array } arr 
 * @returns { Array }
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[Math.floor(arr.length / 2)];
  const a = arr.filter(y => y > pivot);
  const m = arr.filter(y => y === pivot);
  const b = arr.filter(y => y < pivot);
  return [...quickSort(a), ...m, ...quickSort(b)];
}

const sorted = quickSort([48, 39, 3, 4, 5, 7, 8]);
console.log(sorted)