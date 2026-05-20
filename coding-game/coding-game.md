```js
const s = readline();
let object = {};
let order = [];

for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!object[char]) {
        object[char] = 0;
        order.push(char);  // track insertion order
    }
    object[char]++;
}

let o = "";
for (const item of order) {
    o += item.repeat(Math.ceil(object[item] / 2));
}

print(o);

```


```js
function groupAnagrams(str) {
    const acc = {};
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        let c = str[i].split('').sort((a,b) => a.localeCompare(b)).join('');
        if (acc[c]) {
            acc[c].push(str[i]);
        } else {
            acc[c] = [str[i]];
        }
    }
    
    for (const values of Object.values(acc)) {
        arr.push(values);
    }
    return arr;
}

// Test Verification
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// Expected: [["eat","tea","ate"],["tan","nat"],["bat"]]

```


```js
/*Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.
*/
function maxArea(height) {
    // 🚧 YOUR CODE HERE 🚧
    
    return 0;
}

// Test Verification
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Expected: 49
```

```js
/*Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.
*/
function maxArea(height) {
    let max = 0;
    for (let i = 0; i < height.length; i++) {
        if (height[i + 1]) {
            let cw = Math.max(height.length - i, height.length - i + 1)
            console.log(cw);
            ch = Math.min(height[i], height[i + 1]);
            console.log("ch")
            console.log(ch);
            max = Math.max((cw * ch), max);
            
        }
        // console.log(height.length - i, height[i]);
    }
    
    return max;
}

// Test Verification
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Expected: 49



// --- Test Verification ---
const testCases = [
    { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49, name: "Original Example" },
    { input: [1, 1], expected: 1, name: "Minimum Elements" },
    { input: [0, 0], expected: 0, name: "All Zeros" },
    { input: [0, 10, 0, 5, 0], expected: 10, name: "Zeros with Spaced Pillars" },
    { input: [1, 2, 3, 4, 5], expected: 6, name: "Strictly Increasing" },
    { input: [5, 4, 3, 2, 1], expected: 6, name: "Strictly Decreasing" },
    { input: [4, 4, 4, 4, 4], expected: 16, name: "Uniform Heights" },
    { input: [1, 100, 1, 1, 100, 1], expected: 300, name: "Tall Inner Walls" },
    { input: [2, 3, 4, 5, 18, 17, 6], expected: 17, name: "Narrow and Tall Wins" }
];

testCases.forEach(({ input, expected, name }) => {
    const result = maxArea(input);
    const passed = result === expected ? "✅ PASSED" : `❌ FAILED (Got ${result})`;
    console.log(`${passed} | ${name}`);
});

```

# Container With Most Water (LeetCode #11)

## Problem Description

Given `n` non-negative integers `height` where each represents a point at coordinate `(i, height[i])`, find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the **maximum amount of water** a container can store.

## Visual Representation


## Formula

**Area = Width × Height**

- **Width** = distance between two bars (difference in indices)
- **Height** = the shorter bar's height (water spills over the shorter wall)

## Example Calculation

Pick bars at **index 1** (height 8) and **index 8** (height 7):
- Width = 8 - 1 = 7
- Height = min(8, 7) = 7
- Area = 7 × 7 = 49

Pick bars at **index 1** (height 8) and **index 6** (height 8):
- Width = 6 - 1 = 5  
- Height = min(8, 8) = 8
- Area = 5 × 8 = 40

## Complete Walkthrough

```javascript
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

Try different pairs:
- Indices 0 and 8: min(1,7) × 8 = 1 × 8 = 8
- Indices 1 and 8: min(8,7) × 7 = 7 × 7 = 49  ← biggest so far
- Indices 1 and 7: min(8,3) × 6 = 3 × 6 = 18
- Indices 1 and 6: min(8,8) × 5 = 8 × 5 = 40
- Indices 2 and 8: min(6,7) × 6 = 6 × 6 = 36
- Indices 2 and 6: min(6,8) × 4 = 6 × 4 = 24

Answer: 49


```js
/*Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.
*/
function maxArea(height) {
    let max = 0;
    for (let i = 0; i < height.length; i++) {
        if (height[i + 1]) {
            let cw = height.length - 1
            // console.log(cw);
            ch = Math.min(height[i], height[i + 1]);
            // console.log("ch")
            // console.log(ch);
            max = Math.max((cw * ch), max);
            
        }
        // console.log(height.length - i, height[i]);
    }
    
    return max;
}

// Test Verification
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Expected: 49



// --- Test Verification ---
const testCases = [
    { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49, name: "Original Example" },
    { input: [1, 1], expected: 1, name: "Minimum Elements" },
    { input: [0, 0], expected: 0, name: "All Zeros" },
    { input: [0, 10, 0, 5, 0], expected: 10, name: "Zeros with Spaced Pillars" },
    { input: [1, 2, 3, 4, 5], expected: 6, name: "Strictly Increasing" },
    { input: [5, 4, 3, 2, 1], expected: 6, name: "Strictly Decreasing" },
    { input: [4, 4, 4, 4, 4], expected: 16, name: "Uniform Heights" },
    { input: [1, 100, 1, 1, 100, 1], expected: 300, name: "Tall Inner Walls" },
    { input: [2, 3, 4, 5, 18, 17, 6], expected: 17, name: "Narrow and Tall Wins" }
];

testCases.forEach(({ input, expected, name }) => {
    const result = maxArea(input);
    const passed = result === expected ? "✅ PASSED" : `❌ FAILED (Got ${result})`;
    console.log(`${passed} | ${name}`);
});

```

https://www.programiz.com/online-compiler/8etpKOBpg8gcy 

```js

const s = readline();

// Extract only the letters and reverse them
const letters = s.replace(/[^a-z]/gi, '').split('').reverse();

let li = 0;
let result = '';

for (const char of s) {
  if (/[a-z]/i.test(char)) {
    result += letters[li++];  // place next reversed letter
  } else {
    result += char;           // keep number as-is
  }
}

console.log(result);

```


```js

const n = readline();

// Count how many '[' appear at the very start
let depth = 0;
for (const c of n) {
    if (c === '[') depth++;
    else break;
}

const dim = depth - 1;

if (dim <= 0) {
    console.log("None");
} else {
    console.log(dim + "D array");
}

```

```js

const n = readline().split('.');
const hours = parseInt(n[0]);
const minutes = n[1] ? parseInt(n[1]) * 10 : 0;  // .3 → 30 min

const totalMinutes = hours * 60 + minutes;
const remainingMinutes = 24 * 60 - totalMinutes;

const hh = Math.floor(remainingMinutes / 60);
const mm = remainingMinutes % 60;

console.log(`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`);

```