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
  /*
  Kadane's algorithm
  let max = arr[0];
  let submax = arr[0];
  for (let i = 1; i < arr.length; i++) {
    submax = Math.max(submax + arr[i], arr[i]);
    max = Math.max(max, submax);
  }
  return max;
  */
}

console.log(maxSubarrayMax([-2, 1, -3, 4, -1, 2, 1, -5, 4]));