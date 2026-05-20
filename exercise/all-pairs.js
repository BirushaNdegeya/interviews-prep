
/**
 * @param {Array} arr
 * @param {Number} target  
 */
function allPairSum(arr, target) {
  const o = [];
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    const sum = arr[start] + arr[end];
    if (sum === target) {
      o.push([arr[start], arr[end]]);
      start++;
      end--;
    } else if (sum > target) {
      end--
    } else {
      start++;
    }
  }
  return o;
}


console.log(allPairSum([1, 2, 3, 4, 5, 6, 7], 8));
// [[1,7], [2,6], [3,5]]

console.log(allPairSum([-3, -1, 0, 1, 2, 3, 5], 2));
// [[-1,3], [0,2]]