/**
 * 
 * @param {Array} arr 
 */
function maxSubarrayMax(arr) {
  const sums = [];

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];            // extend subarray by one element
      sums.push(sum);
    }
  }

  return Math.max(...sums);
}

console.log(maxSubarrayMax([-2, 1, -3, 4, -1, 2, 1, -5, 4]));