/**
 * Count Islands Algo
 * @param {Array} arr 
 */
function countIslands(arr) {
  let count = 0;
  function dfs(i, j) {
    // out of bounds or water already visited
    if (i < 0 || i >= arr.length || j < 0 || j >= arr[i].length || arr[i][j] !== 1) return;
    arr[i][j] = -1;
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1)
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
}
let grid = [
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 1],
]; // 2
console.log(countIslands(grid));