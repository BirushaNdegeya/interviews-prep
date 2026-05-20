// Input: [1, 3, 2, 6, -1, 4, 1, 8, 2], k = 5
// Output: [2.2, 2.8, 2.4, 3.6, 2.8]
function findAverages(arr, k) {
  if (k > arr.length) return [];
  const avgArr = [];
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  avgArr.push(sum / k);

  for (let i = k; i < arr.length; i++) {
    sum = sum + arr[i] - arr[i - k];
    avgArr.push(sum / k);
  }
  return avgArr;

  // Your solution here
}

console.log(findAverages([1, 3, 2, 6, -1, 4, 1, 8, 2], 5))