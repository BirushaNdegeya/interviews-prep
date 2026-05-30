// Input: [3, 1, 2, 7, 4, 2, 1, 1, 5], k = 8
// Output: 4 → [2, 1, 1, 5]? No: [3,1,2] sum=6≤8, length=3
//         → [1, 2, 1, 1] = 5, length = 4  ✅
/**
 * 
 * @param {Array} arr 
 * @param {Number} k 
 * @returns 
 */
function longestSubarrayWithSumAtMostK(arr, k) {
  const m = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      m.push(arr.slice(i, j + 1))
    }
  }
  const x = m.filter(n => {
    const sum = n.reduce((a, b) => a + b, 0);
    return sum <= k;
  });
  y=Math.max(...x.map(e=>e.length))
  return x.filter(e=>e.length==y)

}
console.log(longestSubarrayWithSumAtMostK([3, 1, 2, 7, 4, 2, 1, 1, 5], 8))