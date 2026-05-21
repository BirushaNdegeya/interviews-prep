let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let o = [];
for (let i = 0; i < matrix.length; i++) {
    const r = matrix.length - 1;
    // console.log(matrix[i]);
    let arr = [];
    // console.log(i);
    for (let j = 0; j < matrix[i].length; j++) {
        const c = matrix[i].length -1;
        if (i == j) {
          // arr.push(matrix[col - j][r -i]);
          arr.push(matrix[i][c - j]);
        }
        // console.log('================', j)
    }
    // console.log(arr);
    o.push(arr);
}
console.log(`[ ${o.join(', ')}] `);