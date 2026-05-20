function maxSubarraySum(arr, num) {
  if (num > arr.length) return null;
  let max = -Infinity;
  let currentMax = 0;
  for (let i = 0; i < num; i++) {
    currentMax += arr[i]
  }
  for (let i = num; i < arr.length; i++) {
    currentMax = currentMax - arr[i - num] + arr[i];
    max = Math.max(currentMax, max);
  }
  return max;
}

let arr = [2, 6, 9, 2, 1, 8, 5, 6, 3];
console.log(maxSubarraySum(arr, 3)); // 19
// sliding window 