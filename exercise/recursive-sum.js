const numbers = [1, 2, 3, 5, 8, 13, 21];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum); // Output: 53

// recursive sum
/**
 *
 * @param {Array} arr
 * @returns { Number }
 */
function recursiveSum(arr) {
  // Base case: if array is empty, return 0
  if (arr.length === 0) return 0;

  // Base case: if array has one element, return that element
  if (arr.length === 1) return arr[0];

  // Recursive case: first element + sum of the rest of the array
  return arr[0] + recursiveSum(arr.slice(1));
}

// Test the recursive function
console.log(recursiveSum(numbers)); // Output: 53
