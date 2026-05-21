/**
 * Diagonal Algo
 * @param {Array} arr 
 */
function diagonalDiff(arr) {
  let x1 = 0;
  let x2 = 0;
  for (let i = 0; i < arr.length; i++) {
    const size = arr[i].length;
    for (let j = 0; j < size; j++) {
      if (i == j) {
        x1 += arr[i][j];
        x2 += arr[i][size - 1 - j]
      }
    }
  }
  return Math.abs(x1 - x2);
}


let m = [
  [1, 2, 3],
  [4, 5, 6],
  [9, 8, 9]
];
console.log(diagonalDiff(m));