# 🧠 JavaScript Arrays & Matrices — Beginner to Master Course

> **Goal:** Understand arrays and 2D matrices so deeply that you can solve any TestDome or coding interview problem with confidence.

---

## 📚 Table of Contents

1. [What is an Array?](#1-what-is-an-array)
2. [Creating & Accessing Arrays](#2-creating--accessing-arrays)
3. [Looping Through Arrays](#3-looping-through-arrays)
4. [Essential Array Methods](#4-essential-array-methods)
5. [What is a Matrix (2D Array)?](#5-what-is-a-matrix-2d-array)
6. [Creating & Accessing Matrices](#6-creating--accessing-matrices)
7. [Looping Through a Matrix](#7-looping-through-a-matrix)
8. [Common Matrix Operations](#8-common-matrix-operations)
9. [Advanced Matrix Patterns](#9-advanced-matrix-patterns)
10. [Practice Problems (Solved)](#10-practice-problems-solved)
11. [TestDome-Style Challenge](#11-testdome-style-challenge)
12. [Cheat Sheet](#12-cheat-sheet)

---

## 1. What is an Array?

An **array** is a list of items stored in a single variable. Think of it like a row of boxes, each holding one value.

```
Index:  0       1       2       3
      ┌─────┬─────┬─────┬─────┐
      │ 10  │ 20  │ 30  │ 40  │
      └─────┴─────┴─────┴─────┘
```

```javascript
let numbers = [10, 20, 30, 40];
//              ↑   ↑   ↑   ↑
//         index 0  1   2   3
```

Arrays can hold **any type** of value:

```javascript
let mixed = [42, "hello", true, null, [1, 2]];
```

---

## 2. Creating & Accessing Arrays

### Creating Arrays

```javascript
// Method 1: Array literal (most common)
let fruits = ["apple", "banana", "cherry"];

// Method 2: new Array()
let empty = new Array(3); // creates [undefined, undefined, undefined]

// Method 3: Array.from()
let zeros = Array.from({ length: 5 }, () => 0); // [0, 0, 0, 0, 0]
```

### Accessing Elements

```javascript
let fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]); // "apple"   ← first element (index 0)
console.log(fruits[2]); // "cherry"  ← third element (index 2)
console.log(fruits[fruits.length - 1]); // "cherry" ← last element
```

> ⚠️ **Remember:** Arrays in JavaScript start at index **0**, not 1!

### Modifying Elements

```javascript
let fruits = ["apple", "banana", "cherry"];
fruits[1] = "mango"; // change banana to mango
console.log(fruits); // ["apple", "mango", "cherry"]
```

### Array Length

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.length); // 3
```

---

## 3. Looping Through Arrays

### for loop (classic)

```javascript
let numbers = [10, 20, 30, 40];

for (let i = 0; i < numbers.length; i++) {
  console.log(i, numbers[i]);
}
// 0 10
// 1 20
// 2 30
// 3 40
```

### for...of loop (cleaner, no index)

```javascript
let fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
  console.log(fruit);
}
// apple
// banana
// cherry
```

### forEach (functional style)

```javascript
let numbers = [10, 20, 30];

numbers.forEach((value, index) => {
  console.log(`Index ${index}: ${value}`);
});
// Index 0: 10
// Index 1: 20
// Index 2: 30
```

---

## 4. Essential Array Methods

These are the most important methods you MUST know:

### `.push()` — Add to end

```javascript
let arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

### `.pop()` — Remove from end

```javascript
let arr = [1, 2, 3];
let removed = arr.pop();
console.log(removed); // 3
console.log(arr);     // [1, 2]
```

### `.shift()` / `.unshift()` — Remove/add from front

```javascript
let arr = [1, 2, 3];
arr.unshift(0); // add to front
console.log(arr); // [0, 1, 2, 3]

arr.shift();    // remove from front
console.log(arr); // [1, 2, 3]
```

### `.map()` — Transform every element (returns new array)

```javascript
let numbers = [1, 2, 3, 4];
let doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]
// original is unchanged!
```

### `.filter()` — Keep only matching elements

```javascript
let numbers = [1, 2, 3, 4, 5, 6];
let evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]
```

### `.reduce()` — Combine all elements into one value

```javascript
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15
```

### `.find()` — Find first matching element

```javascript
let numbers = [5, 12, 8, 130, 44];
let found = numbers.find(n => n > 10);
console.log(found); // 12
```

### `.indexOf()` — Find index of a value

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.indexOf("banana")); // 1
console.log(fruits.indexOf("mango"));  // -1 (not found)
```

### `.includes()` — Check if value exists

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("mango"));  // false
```

### `.slice()` — Copy a portion (does NOT modify original)

```javascript
let arr = [1, 2, 3, 4, 5];
let portion = arr.slice(1, 4); // from index 1 up to (not including) 4
console.log(portion); // [2, 3, 4]
```

### `.splice()` — Remove/insert elements (MODIFIES original)

```javascript
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2); // starting at index 1, remove 2 elements
console.log(arr); // [1, 4, 5]
```

### `.flat()` — Flatten nested arrays

```javascript
let nested = [[1, 2], [3, 4], [5]];
console.log(nested.flat()); // [1, 2, 3, 4, 5]
```

### `.join()` — Convert array to string

```javascript
let arr = [1, 2, 3];
console.log(arr.join("-")); // "1-2-3"
console.log(arr.join(""));  // "123"
```

### `.sort()` — Sort elements

```javascript
// Alphabetical (default)
let fruits = ["cherry", "apple", "banana"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry"]

// Numerical (need a compare function!)
let numbers = [10, 1, 5, 100, 3];
numbers.sort((a, b) => a - b); // ascending
console.log(numbers); // [1, 3, 5, 10, 100]
```

---

## 5. What is a Matrix (2D Array)?

A **matrix** is an array of arrays — a grid with **rows** and **columns**.

Think of it like a spreadsheet or a chessboard:

```
      Col 0  Col 1  Col 2
Row 0 [  1,    2,    3  ]
Row 1 [  4,    5,    6  ]
Row 2 [  7,    8,    9  ]
```

In JavaScript:

```javascript
let matrix = [
  [1, 2, 3],  // row 0
  [4, 5, 6],  // row 1
  [7, 8, 9],  // row 2
];
```

---

## 6. Creating & Accessing Matrices

### Creating a Matrix

```javascript
// Hardcoded
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Dynamically (3 rows, 4 columns, all zeros)
let rows = 3;
let cols = 4;
let grid = [];

for (let i = 0; i < rows; i++) {
  grid.push(new Array(cols).fill(0));
}
console.log(grid);
// [[0,0,0,0], [0,0,0,0], [0,0,0,0]]
```

> ⚠️ **Common Mistake:** Don't use `Array(rows).fill([])` — all rows will share the same array reference!

```javascript
// WRONG:
let bad = Array(3).fill([]); // all rows are the SAME array!

// CORRECT:
let good = Array.from({ length: 3 }, () => []);
```

### Accessing Elements

```javascript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix[0][0]); // 1   ← row 0, col 0
console.log(matrix[1][2]); // 6   ← row 1, col 2
console.log(matrix[2][1]); // 8   ← row 2, col 1
```

The pattern is always: `matrix[row][col]`

### Matrix Dimensions

```javascript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let numRows = matrix.length;       // 3
let numCols = matrix[0].length;    // 3
```

---

## 7. Looping Through a Matrix

Always use a **nested loop**: outer loop for rows, inner loop for columns.

```javascript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(`[${row}][${col}] = ${matrix[row][col]}`);
  }
}
// [0][0] = 1
// [0][1] = 2
// [0][2] = 3
// [1][0] = 4
// ... and so on
```

### Print matrix nicely

```javascript
function printMatrix(matrix) {
  for (let row of matrix) {
    console.log(row.join(" "));
  }
}

printMatrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
// 1 2 3
// 4 5 6
// 7 8 9
```

---

## 8. Common Matrix Operations

### 8.1 Find Sum of All Elements

```javascript
function sumMatrix(matrix) {
  let total = 0;
  for (let row of matrix) {
    for (let val of row) {
      total += val;
    }
  }
  return total;
}

// Or using reduce + flat:
function sumMatrix2(matrix) {
  return matrix.flat().reduce((sum, val) => sum + val, 0);
}

console.log(sumMatrix([[1,2],[3,4]])); // 10
```

### 8.2 Find Maximum Value

```javascript
function findMax(matrix) {
  let max = -Infinity;
  for (let row of matrix) {
    for (let val of row) {
      if (val > max) max = val;
    }
  }
  return max;
}

console.log(findMax([[3, 1], [9, 2]])); // 9
```

### 8.3 Transpose a Matrix

Transposing means flipping rows and columns:

```
Original:        Transposed:
1  2  3    →    1  4  7
4  5  6         2  5  8
7  8  9         3  6  9
```

```javascript
function transpose(matrix) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let result = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][r] = matrix[r][c]; // swap row and col!
    }
  }
  return result;
}

let m = [[1,2,3],[4,5,6],[7,8,9]];
console.log(transpose(m));
// [[1,4,7],[2,5,8],[3,6,9]]
```

### 8.4 Rotate Matrix 90° Clockwise

```
Before:    After:
1  2  3    7  4  1
4  5  6    8  5  2
7  8  9    9  6  3
```

**Formula:** `result[col][rows - 1 - row] = matrix[row][col]`

```javascript
function rotate90(matrix) {
  let n = matrix.length;
  let result = Array.from({ length: n }, () => Array(n).fill(0));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      result[c][n - 1 - r] = matrix[r][c];
    }
  }
  return result;
}

let m = [[1,2,3],[4,5,6],[7,8,9]];
console.log(rotate90(m));
// [[7,4,1],[8,5,2],[9,6,3]]
```

### 8.5 Diagonal Elements

```javascript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Main diagonal (top-left to bottom-right): where row === col
let mainDiagonal = [];
for (let i = 0; i < matrix.length; i++) {
  mainDiagonal.push(matrix[i][i]);
}
console.log(mainDiagonal); // [1, 5, 9]

// Anti-diagonal (top-right to bottom-left): where col = (n-1-row)
let n = matrix.length;
let antiDiagonal = [];
for (let i = 0; i < n; i++) {
  antiDiagonal.push(matrix[i][n - 1 - i]);
}
console.log(antiDiagonal); // [3, 5, 7]
```

### 8.6 Search in Matrix

```javascript
function searchMatrix(matrix, target) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === target) {
        return { row: r, col: c };
      }
    }
  }
  return null; // not found
}

let m = [[1,2,3],[4,5,6]];
console.log(searchMatrix(m, 5)); // { row: 1, col: 1 }
```

---

## 9. Advanced Matrix Patterns

### 9.1 Spiral Order Traversal

Read the matrix in a clockwise spiral:

```
1  2  3
4  5  6   →  [1, 2, 3, 6, 9, 8, 7, 4, 5]
7  8  9
```

```javascript
function spiralOrder(matrix) {
  let result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Go right
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;

    // Go down
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;

    // Go left
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }

    // Go up
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }
  return result;
}

let m = [[1,2,3],[4,5,6],[7,8,9]];
console.log(spiralOrder(m)); // [1,2,3,6,9,8,7,4,5]
```

### 9.2 Check Symmetry

A matrix is symmetric if `matrix[i][j] === matrix[j][i]` for all positions:

```javascript
function isSymmetric(matrix) {
  let n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== matrix[j][i]) return false;
    }
  }
  return true;
}

console.log(isSymmetric([[1,2],[2,1]])); // true
console.log(isSymmetric([[1,2],[3,1]])); // false
```

### 9.3 Count Elements Matching a Condition

```javascript
function countGreaterThan(matrix, threshold) {
  let count = 0;
  for (let row of matrix) {
    for (let val of row) {
      if (val > threshold) count++;
    }
  }
  return count;
}

let m = [[1, 5, 3], [8, 2, 7]];
console.log(countGreaterThan(m, 4)); // 3   (5, 8, 7)
```

### 9.4 Column Sum

```javascript
function columnSums(matrix) {
  let cols = matrix[0].length;
  let sums = Array(cols).fill(0);

  for (let row of matrix) {
    for (let c = 0; c < row.length; c++) {
      sums[c] += row[c];
    }
  }
  return sums;
}

let m = [[1,2,3],[4,5,6]];
console.log(columnSums(m)); // [5, 7, 9]
```

### 9.5 Row Sum

```javascript
function rowSums(matrix) {
  return matrix.map(row => row.reduce((sum, val) => sum + val, 0));
}

let m = [[1,2,3],[4,5,6]];
console.log(rowSums(m)); // [6, 15]
```

---

## 10. Practice Problems (Solved)

### Problem 1: Zero Out Row and Column

If any element is 0, set its entire row and column to 0.

```javascript
function zeroMatrix(matrix) {
  let rows = new Set();
  let cols = new Set();

  // Step 1: find all zeros
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 0) {
        rows.add(r);
        cols.add(c);
      }
    }
  }

  // Step 2: zero out
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (rows.has(r) || cols.has(c)) {
        matrix[r][c] = 0;
      }
    }
  }
  return matrix;
}

let m = [[1,1,1],[1,0,1],[1,1,1]];
console.log(zeroMatrix(m));
// [[1,0,1],[0,0,0],[1,0,1]]
```

### Problem 2: Set Matrix Zeroes by Rows Only

For each cell equal to a specific value, zero its entire row:

```javascript
function zeroRows(matrix, target) {
  for (let r = 0; r < matrix.length; r++) {
    if (matrix[r].includes(target)) {
      matrix[r] = matrix[r].map(() => 0);
    }
  }
  return matrix;
}
```

### Problem 3: Count Islands (bonus advanced)

Count groups of connected `1`s in a grid of `0`s and `1`s:

```javascript
function countIslands(grid) {
  let count = 0;

  function dfs(r, c) {
    // out of bounds or water or already visited
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== 1) return;
    grid[r][c] = -1; // mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}

let grid = [
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 1],
];
console.log(countIslands(grid)); // 2
```

---

## 11. TestDome-Style Challenge

Below is a typical TestDome matrix problem. Read it, try it yourself, then look at the solution.

---

### 🧩 Challenge: Diagonal Difference

Given a square matrix, compute the absolute difference between the sum of its main diagonal and the sum of its anti-diagonal.

**Example:**
```
Matrix:
1  2  3
4  5  6
9  8  9

Main diagonal:    1 + 5 + 9 = 15
Anti-diagonal:    3 + 5 + 9 = 17
Difference:       |15 - 17| = 2
```

**Try it yourself first!**

<details>
<summary>✅ Click to see solution</summary>

```javascript
function diagonalDifference(matrix) {
  let n = matrix.length;
  let mainSum = 0;
  let antiSum = 0;

  for (let i = 0; i < n; i++) {
    mainSum += matrix[i][i];          // main: row and col are the same
    antiSum += matrix[i][n - 1 - i]; // anti: col counts backwards
  }

  return Math.abs(mainSum - antiSum);
}

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [9, 8, 9]
];

console.log(diagonalDifference(matrix)); // 2
```

</details>

---

### 🧩 Challenge: Rotate Matrix Elements

Rotate the elements of the matrix (outermost ring) clockwise by one step.

**Try it yourself!**

<details>
<summary>✅ Click to see solution</summary>

```javascript
function rotateRing(matrix) {
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top < bottom && left < right) {
    let prev = matrix[top + 1][left]; // save first element of next step

    // Move left row right
    for (let c = left; c <= right; c++) {
      let temp = matrix[top][c];
      matrix[top][c] = prev;
      prev = temp;
    }
    top++;

    // Move right column down
    for (let r = top; r <= bottom; r++) {
      let temp = matrix[r][right];
      matrix[r][right] = prev;
      prev = temp;
    }
    right--;

    // Move bottom row left
    for (let c = right; c >= left; c--) {
      let temp = matrix[bottom][c];
      matrix[bottom][c] = prev;
      prev = temp;
    }
    bottom--;

    // Move left column up
    for (let r = bottom; r >= top; r--) {
      let temp = matrix[r][left];
      matrix[r][left] = prev;
      prev = temp;
    }
    left++;
  }
  return matrix;
}
```

</details>

---

## 12. Cheat Sheet

### Array Quick Reference

| Operation | Code | Mutates? |
|---|---|---|
| Add to end | `arr.push(val)` | ✅ Yes |
| Remove from end | `arr.pop()` | ✅ Yes |
| Add to front | `arr.unshift(val)` | ✅ Yes |
| Remove from front | `arr.shift()` | ✅ Yes |
| Copy portion | `arr.slice(start, end)` | ❌ No |
| Remove/insert | `arr.splice(i, n)` | ✅ Yes |
| Transform all | `arr.map(fn)` | ❌ No |
| Filter some | `arr.filter(fn)` | ❌ No |
| Combine all | `arr.reduce(fn, init)` | ❌ No |
| Find first | `arr.find(fn)` | ❌ No |
| Check exists | `arr.includes(val)` | ❌ No |
| Get index | `arr.indexOf(val)` | ❌ No |
| Flatten | `arr.flat()` | ❌ No |
| Sort | `arr.sort(fn)` | ✅ Yes |
| Join to string | `arr.join(sep)` | ❌ No |

### Matrix Quick Reference

```javascript
// Dimensions
let rows = matrix.length;
let cols = matrix[0].length;

// Access element
matrix[row][col]

// Loop all elements
for (let r = 0; r < rows; r++)
  for (let c = 0; c < cols; c++)
    // use matrix[r][c]

// Main diagonal (r === c)
matrix[i][i]

// Anti-diagonal
matrix[i][n - 1 - i]

// Transpose
result[c][r] = matrix[r][c]

// Rotate 90° clockwise
result[c][n - 1 - r] = matrix[r][c]

// Create empty matrix
Array.from({ length: rows }, () => Array(cols).fill(0))
```

---

## 🎯 Learning Path Summary

Follow this order to go from beginner to master:

1. ✅ Learn what arrays are and how to access elements by index
2. ✅ Practice all major array methods (map, filter, reduce)
3. ✅ Learn what a 2D array/matrix is
4. ✅ Practice nested loops (row + col)
5. ✅ Implement: sum, max, search, transpose
6. ✅ Implement: rotate, diagonal, spiral
7. ✅ Solve TestDome-style timed problems

Good luck! 🚀 With consistent practice, you will master arrays and matrices in JavaScript.