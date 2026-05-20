// JavaScript Tricks for Interviews
// Swap without temp variable
[a, b] = [b, a];

// Check if number is integer
Number.isInteger(4.0); // true

// Flatten an array
arr.flat(Infinity);

// Get unique values
[...new Set(arr)];

// Sort numbers correctly
arr.sort((a, b) => a - b);

// String to char array
[...'hello'] // ['h','e','l','l','o']

// Repeat a string
'ab'.repeat(3) // 'ababab'

// Fill an array
new Array(5).fill(0) // [0,0,0,0,0]

// 2D array initialization
Array.from({length: 3}, () => Array(3).fill(0));

// Max/Min of array
Math.max(...arr);
Math.min(...arr);

// Check if all/some elements match
arr.every(x => x > 0);
arr.some(x => x > 0);

// Group by key
arr.reduce((acc, item) => {
  (acc[item.key] ||= []).push(item);
  return acc;
}, {});