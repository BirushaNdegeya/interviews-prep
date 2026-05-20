let rows = 3;
let cols = 4;
let grid = [];
for (let i = 0; i < rows; i++) {
  grid.push(Array.from({ length: cols }, () => i + 1));
}
// console.log(grid);
// prettier Print of an array
// console.log('answer');
for (let row = 0; row < grid.length; row++) {
  // console.log(`[${grid[row].join(", ")}]`);
}
// Find Sum of All Elements
let sum = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    sum += grid[row][col];
  }
}
// console.log("All sum is", sum);
// Find maximum Value
let max = -Infinity;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    const v = grid[row][col]
    max = Math.max(max, v);
  }
}
// console.log("Maximum number is:", max);
// Transpore a matrix
