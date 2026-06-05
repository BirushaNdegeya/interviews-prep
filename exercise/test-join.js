const arr = [1, 9, 8, 4, 0, 2, 0, 4, 0, 88];
const zero = [0, 0, 0];
function quicksort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(n => n > pivot);
  const mid = arr.filter(n => n == pivot);
  const right = arr.filter(n => n < pivot);
  return [...quicksort(left), ...mid, ...quicksort(right)];
}
const res = quicksort(arr);
const resp = quicksort(zero);
console.log(res.join(''))
console.log(resp.join(''));
