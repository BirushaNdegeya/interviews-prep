# 👆👆 JavaScript Multiple Pointers Pattern — Beginner to Master Course

> **Based on:** The "Multiple Pointers" problem-solving strategy from algorithm design.
> **Goal:** Understand this pattern so deeply that you can recognize it instantly, apply it confidently, and ace any interview question that requires it.

---

## 📚 Table of Contents

1. [What is the Multiple Pointers Pattern?](#1-what-is-the-multiple-pointers-pattern)
2. [Why Do We Need It? (The Problem with Naive Solutions)](#2-why-do-we-need-it)
3. [The Two Main Variations](#3-the-two-main-variations)
4. [Variation 1 — Left & Right Pointers (Converging)](#4-variation-1--left--right-pointers-converging)
5. [Variation 2 — Both Pointers on the Same Side (Sliding)](#5-variation-2--both-pointers-on-the-same-side-sliding)
6. [Step-by-Step Problem Solving Framework](#6-step-by-step-problem-solving-framework)
7. [Core Examples with Full Walkthroughs](#7-core-examples-with-full-walkthroughs)
8. [Multiple Pointers on Strings](#8-multiple-pointers-on-strings)
9. [Multiple Pointers on Linked Lists](#9-multiple-pointers-on-linked-lists)
10. [Common Mistakes & How to Avoid Them](#10-common-mistakes--how-to-avoid-them)
11. [Time & Space Complexity Guide](#11-time--space-complexity-guide)
12. [Interview Challenge Problems](#12-interview-challenge-problems)
13. [Cheat Sheet](#13-cheat-sheet)

---

## 1. What is the Multiple Pointers Pattern?

The **Multiple Pointers** pattern is a strategy where you use **two (or more) variables** — called pointers — that each track a position inside a data structure (like an array, string, or linked list). You then move these pointers in a specific direction based on conditions, instead of using nested loops.

### The core idea in one sentence:

> Instead of comparing every element to every other element (slow), use two intelligent markers that move smartly through the data (fast).

### Visual analogy — two people reading a book

Imagine you want to check whether a book reads the same forwards and backwards (a palindrome). You could:

- **Slow way:** Read the whole thing forwards, write it down, then compare letter by letter — O(n) space + O(n) time.
- **Smart way:** One person starts at page 1, another starts at the last page, and they walk towards each other comparing as they go. If they ever disagree, stop. — O(1) space + O(n) time.

That walking-towards-each-other idea is exactly the Multiple Pointers pattern.

---

## 2. Why Do We Need It?

### The naive approach — O(n²) nested loops

Most beginners solve pair-finding problems with two nested loops:

```javascript
// Find a pair that sums to zero — NAIVE approach
function sumZeroNaive(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
  return undefined;
}
```

This works, but:
- For 10 items → up to 45 comparisons
- For 1,000 items → up to 499,500 comparisons
- For 1,000,000 items → up to ~500 billion comparisons 🔥

That's **O(n²)** — quadratic time. It becomes unusably slow for large inputs.

### The Multiple Pointers approach — O(n) linear time

```javascript
// Same problem — SMART approach using two pointers
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) return [arr[left], arr[right]];
    else if (sum > 0) right--;  // too big, bring right down
    else left++;                 // too small, bring left up
  }
  return undefined;
}
```

- For 1,000,000 items → at most 1,000,000 comparisons (linear, O(n))
- Uses **no extra data structures** — O(1) space

---

## 3. The Two Main Variations

```
VARIATION 1: Converging (Left & Right)         VARIATION 2: Sliding (Same Direction)

  [−4, −2, 0, 1, 3, 5]                          [1, 1, 2, 2, 3, 4, 4]
    ↑               ↑                              ↑  ↑
   left           right                          slow fast

  Pointers start at opposite ends               Both pointers start at the left
  and move TOWARDS each other                   and move FORWARD together
  
  Used for: pair sums, palindromes,             Used for: counting unique values,
  two-sum, reversals                            removing duplicates, sliding windows
```

---

## 4. Variation 1 — Left & Right Pointers (Converging)

### How it works

1. Place `left` pointer at index `0` (start)
2. Place `right` pointer at index `arr.length - 1` (end)
3. Loop **while `left < right`**
4. Check the sum (or condition) of `arr[left]` and `arr[right]`
5. Move one pointer based on the result
6. Stop when they meet or cross

### The decision tree

```
sum === target  →  🎉 Found it! Return the pair
sum > target    →  right--   (the right value is too big, shrink it)
sum < target    →  left++    (the left value is too small, grow it)
left >= right   →  No pair exists, return undefined
```

### Full Example: sumZero

```javascript
function sumZero(arr) {
  // arr must be SORTED for this to work
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];

    if (sum === 0) {
      return [arr[left], arr[right]]; // found the pair!
    } else if (sum > 0) {
      right--; // sum is too big, move right pointer left
    } else {
      left++;  // sum is too small, move left pointer right
    }
  }

  return undefined; // no pair found
}

// Test cases:
console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // [-3, 3]
console.log(sumZero([-2, 0, 1, 3]));              // undefined
console.log(sumZero([-4, -3, -2, -1, 0]));        // undefined
console.log(sumZero([0]));                         // undefined
```

### Step-by-step trace

```
arr = [-4, -2, 0, 2, 5]
       ↑            ↑
      left         right

Step 1: left=-4, right=5  →  sum=1  →  1 > 0, so right--
Step 2: left=-4, right=2  →  sum=-2 →  -2 < 0, so left++
Step 3: left=-2, right=2  →  sum=0  →  FOUND! Return [-2, 2]
```

---

## 5. Variation 2 — Both Pointers on the Same Side (Sliding)

### How it works

1. Place `slow` (or `i`) pointer at index `0`
2. Place `fast` (or `j`) pointer at index `1`
3. Loop while `fast < arr.length`
4. Compare `arr[slow]` and `arr[fast]`
5. Move `fast` forward every iteration
6. Move `slow` only when a condition is met

### Full Example: Count Unique Values

```javascript
function countUniqueValues(arr) {
  // arr must be SORTED
  if (arr.length === 0) return 0;

  let slow = 0; // tracks the last unique value seen

  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;               // move slow pointer forward
      arr[slow] = arr[fast]; // write the new unique value
    }
    // if they're equal, fast just keeps moving — slow stays
  }

  return slow + 1; // the count of unique values
}

// Test cases:
console.log(countUniqueValues([1, 1, 1, 2, 3, 3, 4])); // 4
console.log(countUniqueValues([1, 2, 3, 4, 5]));        // 5 (all unique)
console.log(countUniqueValues([1, 1, 1, 1, 1]));        // 1
console.log(countUniqueValues([]));                     // 0
```

### Step-by-step trace

```
arr = [1, 1, 2, 2, 3]
       ↑  ↑
      slow fast

Step 1: arr[fast]=1, arr[slow]=1  → equal, fast++ only
        [1, 1, 2, 2, 3]  slow=0, fast=2
Step 2: arr[fast]=2, arr[slow]=1  → different! slow++, arr[1]=2
        [1, 2, 2, 2, 3]  slow=1, fast=3
Step 3: arr[fast]=2, arr[slow]=2  → equal, fast++ only
        [1, 2, 2, 2, 3]  slow=1, fast=4
Step 4: arr[fast]=3, arr[slow]=2  → different! slow++, arr[2]=3
        [1, 2, 3, 2, 3]  slow=2, fast=5
Step 5: fast >= length → stop
Result: slow + 1 = 3 unique values ✅
```

---

## 6. Step-by-Step Problem Solving Framework

When you see a problem, ask yourself these questions **in order**:

### Step 1: Is the data sorted (or can it be)?

Multiple pointers work best on sorted data. If not sorted:
- Can you sort it first? (Sorting costs O(n log n) but is often worth it)
- Is there another way (hash map)?

### Step 2: What are you looking for?

- A **pair** that meets a condition? → Converging pointers (left + right)
- **Unique** values / removing duplicates? → Same-direction pointers
- A **subarray** of a certain size or sum? → Sliding window (related pattern)

### Step 3: What moves which pointer?

Draw it out:
```
Condition met      → return / record
Condition too big  → right-- (or fast--, shrink from the right)
Condition too small → left++ (or slow++, grow from the left)
```

### Step 4: What is the stopping condition?

- Converging: `while (left < right)` — stop before they cross
- Same direction: `while (fast < arr.length)` — stop at the end

### Step 5: Handle edge cases

Always check:
- Empty array `[]`
- Single element `[x]`
- All same elements `[2, 2, 2, 2]`
- Already satisfied on first check

---

## 7. Core Examples with Full Walkthroughs

### Example 1: Two Sum (sorted array)

Find **all pairs** (not just the first) that sum to a target.

```javascript
function twoSum(arr, target) {
  let result = [];
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];

    if (sum === target) {
      result.push([arr[left], arr[right]]);
      left++;   // move both to find more pairs
      right--;
    } else if (sum > target) {
      right--;
    } else {
      left++;
    }
  }

  return result;
}

console.log(twoSum([1, 2, 3, 4, 5, 6, 7], 8));
// [[1,7], [2,6], [3,5]]

console.log(twoSum([-3, -1, 0, 1, 2, 3, 5], 2));
// [[-1,3], [0,2]]
```

---

### Example 2: Is Palindrome?

A string is a palindrome if it reads the same forwards and backwards.

```javascript
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false; // mismatch found
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("abcba"));   // true
console.log(isPalindrome("a"));       // true
console.log(isPalindrome(""));        // true
```

---

### Example 3: Remove Duplicates In-Place

Remove duplicates from a sorted array **without using extra space**.

```javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  return slow + 1; // length of unique portion
}

let arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let len = removeDuplicates(arr);
console.log(len);              // 5
console.log(arr.slice(0, len)); // [0, 1, 2, 3, 4]
```

---

### Example 4: Average Pair

Given a sorted array and a target average, determine if there is a pair of values in the array where the average of the pair equals the target.

```javascript
function averagePair(arr, target) {
  if (arr.length === 0) return false;

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let avg = (arr[left] + arr[right]) / 2;

    if (avg === target) return true;
    else if (avg > target) right--;
    else left++;
  }

  return false;
}

console.log(averagePair([1, 2, 3], 2.5));        // true  (2+3)/2=2.5
console.log(averagePair([1, 3, 3, 5, 6, 7], 4)); // true  (1+7)/2=4
console.log(averagePair([1, 2, 3], 100));         // false
console.log(averagePair([], 4));                  // false
```

---

### Example 5: Is Subsequence?

Check if all the characters in `str1` appear in the same order inside `str2`.

```javascript
function isSubsequence(str1, str2) {
  let i = 0; // pointer for str1
  let j = 0; // pointer for str2

  while (j < str2.length) {
    if (str1[i] === str2[j]) {
      i++; // matched a character, advance str1 pointer
    }
    j++; // always advance str2 pointer

    if (i === str1.length) return true; // all chars matched
  }

  return false;
}

console.log(isSubsequence("abc", "ahbgdc"));  // true  (a...b...c)
console.log(isSubsequence("axc", "ahbgdc"));  // false (no 'x' after 'a')
console.log(isSubsequence("", "hello"));       // true  (empty is always sub)
console.log(isSubsequence("abc", "ab"));       // false (c never found)
```

---

### Example 6: Three Sum (Classic Interview Problem)

Find all **unique triplets** that sum to zero.

```javascript
function threeSum(arr) {
  arr.sort((a, b) => a - b); // sort first
  let result = [];

  for (let i = 0; i < arr.length - 2; i++) {
    // Skip duplicate values for the first element
    if (i > 0 && arr[i] === arr[i - 1]) continue;

    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right];

      if (sum === 0) {
        result.push([arr[i], arr[left], arr[right]]);
        // Skip duplicates for second and third elements
        while (left < right && arr[left] === arr[left + 1]) left++;
        while (left < right && arr[right] === arr[right - 1]) right--;
        left++;
        right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }

  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1, -1, 2], [-1, 0, 1]]

console.log(threeSum([0, 0, 0, 0]));
// [[0, 0, 0]]

console.log(threeSum([-2, 0, 0, 2, 2]));
// [[-2, 0, 2]]
```

---

### Example 7: Container With Most Water

Given heights of walls, find two walls that hold the most water.

```javascript
function maxWater(heights) {
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    let width = right - left;
    let height = Math.min(heights[left], heights[right]); // limited by shorter wall
    let area = width * height;
    maxArea = Math.max(maxArea, area);

    // Move the pointer at the shorter wall (the tall one can't help)
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

console.log(maxWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxWater([1, 1]));                        // 1
console.log(maxWater([4, 3, 2, 1, 4]));               // 16
```

---

## 8. Multiple Pointers on Strings

Strings are just arrays of characters — the same pattern applies.

### Remove spaces from a string (in-place logic)

```javascript
function removeSpaces(str) {
  let chars = str.split("");
  let slow = 0;

  for (let fast = 0; fast < chars.length; fast++) {
    if (chars[fast] !== " ") {
      chars[slow] = chars[fast];
      slow++;
    }
  }

  return chars.slice(0, slow).join("");
}

console.log(removeSpaces("h e l l o"));  // "hello"
console.log(removeSpaces("  abc  "));    // "abc"
```

### Valid palindrome (ignore non-alphanumeric)

```javascript
function isPalindromeClean(str) {
  // Normalize: lowercase, letters and digits only
  let cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}

console.log(isPalindromeClean("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeClean("race a car"));                     // false
console.log(isPalindromeClean(" "));                              // true
```

### Reverse a string in place

```javascript
function reverseString(str) {
  let arr = str.split("");
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // swap
    left++;
    right--;
  }

  return arr.join("");
}

console.log(reverseString("hello"));     // "olleh"
console.log(reverseString("abcde"));     // "edcba"
console.log(reverseString("racecar"));   // "racecar"
```

---

## 9. Multiple Pointers on Linked Lists

Even without indices, you can use a `slow` and `fast` pointer on linked lists. The fast pointer moves 2 nodes at a time while slow moves 1.

### Find the middle of a linked list

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function findMiddle(head) {
  let slow = head;
  let fast = head;

  // fast moves 2x speed → when fast reaches end, slow is at middle
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // this is the middle node
}

// Build: 1 → 2 → 3 → 4 → 5
let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

console.log(findMiddle(head).val); // 3
```

### Detect a cycle in a linked list

```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // move 1 step
    fast = fast.next.next;  // move 2 steps

    if (slow === fast) return true; // they met → cycle exists
  }

  return false; // fast reached end → no cycle
}
```

### Find the Nth node from the end

```javascript
function nthFromEnd(head, n) {
  let left = head;
  let right = head;

  // Move right n steps ahead
  for (let i = 0; i < n; i++) {
    if (right === null) return null; // n > length
    right = right.next;
  }

  // Move both until right reaches the end
  while (right !== null) {
    left = left.next;
    right = right.next;
  }

  return left; // left is now at the nth from end
}
```

---

## 10. Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Forgetting to sort the array first

```javascript
// WRONG — two pointers REQUIRE sorted input for pair problems
function sumZeroBroken(arr) {
  let left = 0, right = arr.length - 1;
  // arr = [3, -2, 1, -3, 2] — NOT sorted → wrong results
}

// CORRECT — sort first
function sumZeroFixed(arr) {
  arr.sort((a, b) => a - b); // ← sort ascending
  let left = 0, right = arr.length - 1;
  // ...
}
```

### ❌ Mistake 2: Using `left <= right` instead of `left < right`

```javascript
// WRONG — when left === right, we're looking at the SAME element
// Adding it to itself can give a false positive (e.g., 0 + 0 = 0)
while (left <= right) { /* ... */ }

// CORRECT
while (left < right) { /* ... */ }
```

### ❌ Mistake 3: Moving the wrong pointer

```javascript
// Looking for sum === 0
let sum = arr[left] + arr[right]; // = -5 (too small)

// WRONG — moving right down makes it even smaller!
right--;

// CORRECT — sum is too small → left must be more positive → left++
left++;
```

### ❌ Mistake 4: Not handling empty arrays

```javascript
function countUniqueValues(arr) {
  // WRONG — arr[0] throws if arr is empty
  let slow = 0;

  // CORRECT — guard clause first
  if (arr.length === 0) return 0;
  let slow2 = 0;
}
```

### ❌ Mistake 5: Infinite loop when pointers never move

```javascript
// If neither pointer moves in the loop, it runs forever
while (left < right) {
  let sum = arr[left] + arr[right];
  if (sum === 0) return [arr[left], arr[right]];
  // ⚠️ forgot the else branches that move left or right!
}

// Always make sure EVERY branch of your if/else moves at least one pointer
```

---

## 11. Time & Space Complexity Guide

| Problem Type | Naive (Nested Loop) | Multiple Pointers | Space |
|---|---|---|---|
| Find pair summing to X | O(n²) | O(n) — after O(n log n) sort | O(1) |
| Count unique values | O(n) with Set | O(n) in-place | O(1) vs O(n) |
| Is palindrome | O(n) reversed string | O(n) | O(1) |
| Three sum | O(n³) | O(n²) | O(1) |
| Detect cycle (linked list) | O(n) with Set | O(n) | O(1) vs O(n) |
| Middle of linked list | O(n) count first | O(n) | O(1) |
| Container with most water | O(n²) | O(n) | O(1) |

> ✅ **Key insight:** Multiple pointers give you the **same or better time complexity** as nested loops, but with **O(1) space** (no extra data structures needed).

---

## 12. Interview Challenge Problems

These are the most important and frequently asked problems. Try each one yourself before looking at the solution.

---

### 🧩 Challenge 1: Three Sum Closest

Given a sorted array and a target, find 3 numbers whose sum is closest to the target. Return the sum.

```
Input: arr = [-1, 2, 1, -4], target = 1
Output: 2  (because -1 + 2 + 1 = 2, closest to 1)
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function threeSumClosest(arr, target) {
  arr.sort((a, b) => a - b);
  let closest = Infinity;

  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right];

      // Update closest if this sum is nearer to target
      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum < target) left++;
      else if (sum > target) right--;
      else return sum; // exact match!
    }
  }

  return closest;
}

console.log(threeSumClosest([-1, 2, 1, -4], 1)); // 2
console.log(threeSumClosest([0, 0, 0], 1));       // 0
```

**Why it works:** Fix one element with the outer loop. Use two pointers on the rest to find the pair that brings the sum closest to target. Time: O(n²).

</details>

---

### 🧩 Challenge 2: Sort Colors (Dutch National Flag)

Given an array of 0s, 1s, and 2s, sort it in-place without using sort().

```
Input:  [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function sortColors(arr) {
  let low = 0;               // boundary for 0s
  let mid = 0;               // current element
  let high = arr.length - 1; // boundary for 2s

  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]]; // swap with low
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++; // 1 is already in the right place
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]]; // swap with high
      high--;
      // don't increment mid — we need to check the swapped value
    }
  }

  return arr;
}

console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]
console.log(sortColors([2, 0, 1]));            // [0, 1, 2]
```

**Why it works:** This is a 3-pointer solution (low, mid, high). Elements less than mid go to the left zone, greater go to the right zone. Time: O(n), Space: O(1).

</details>

---

### 🧩 Challenge 3: Remove Element In-Place

Remove all occurrences of a given value from a sorted array in-place. Return the new length.

```
Input:  arr = [3, 2, 2, 3], val = 3
Output: 2  (arr becomes [2, 2, _, _])
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function removeElement(arr, val) {
  let slow = 0;

  for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== val) {
      arr[slow] = arr[fast]; // copy over the non-val element
      slow++;
    }
    // if arr[fast] === val, just skip it (fast advances, slow stays)
  }

  return slow; // new length
}

let arr = [3, 2, 2, 3];
let len = removeElement(arr, 3);
console.log(len);             // 2
console.log(arr.slice(0, len)); // [2, 2]

let arr2 = [0, 1, 2, 2, 3, 0, 4, 2];
let len2 = removeElement(arr2, 2);
console.log(len2);              // 5
console.log(arr2.slice(0, len2)); // [0, 1, 3, 0, 4]
```

</details>

---

### 🧩 Challenge 4: Trapping Rain Water

Given an array of wall heights, compute how much water it can trap after rain.

```
Input:  [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left]; // update left wall max
      } else {
        water += leftMax - height[left]; // this cell traps water
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right]; // update right wall max
      } else {
        water += rightMax - height[right]; // this cell traps water
      }
      right--;
    }
  }

  return water;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5]));                    // 9
```

**Why it works:** At each step, we know the limiting wall. If left is shorter, the water at `left` is determined by `leftMax`. We move the shorter side inward. Time: O(n), Space: O(1).

</details>

---

### 🧩 Challenge 5: Four Sum

Find all unique quadruplets that sum to a target.

```
Input:  arr = [1, 0, -1, 0, -2, 2], target = 0
Output: [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function fourSum(arr, target) {
  arr.sort((a, b) => a - b);
  let result = [];

  for (let i = 0; i < arr.length - 3; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue; // skip duplicates

    for (let j = i + 1; j < arr.length - 2; j++) {
      if (j > i + 1 && arr[j] === arr[j - 1]) continue; // skip duplicates

      let left = j + 1;
      let right = arr.length - 1;

      while (left < right) {
        let sum = arr[i] + arr[j] + arr[left] + arr[right];

        if (sum === target) {
          result.push([arr[i], arr[j], arr[left], arr[right]]);
          while (left < right && arr[left] === arr[left + 1]) left++;
          while (left < right && arr[right] === arr[right - 1]) right--;
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return result;
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
// [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

**Pattern:** Fix two elements with outer loops, use two pointers for the inner pair. Time: O(n³).

</details>

---

### 🧩 Challenge 6: Minimum Window to Sort

Find the shortest subarray that, if sorted, makes the whole array sorted.

```
Input:  [2, 6, 4, 8, 10, 9, 15]
Output: 5  (subarray [6, 4, 8, 10, 9] needs sorting)
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function findUnsortedSubarray(arr) {
  let n = arr.length;
  let left = 0;
  let right = n - 1;

  // Find left boundary — first element that is out of order
  while (left < n - 1 && arr[left] <= arr[left + 1]) left++;
  if (left === n - 1) return 0; // already sorted!

  // Find right boundary — last element that is out of order
  while (right > 0 && arr[right] >= arr[right - 1]) right--;

  // Find min and max in the window
  let subMin = Infinity;
  let subMax = -Infinity;
  for (let i = left; i <= right; i++) {
    subMin = Math.min(subMin, arr[i]);
    subMax = Math.max(subMax, arr[i]);
  }

  // Expand left if needed (elements in sorted part that are > subMin)
  while (left > 0 && arr[left - 1] > subMin) left--;

  // Expand right if needed (elements in sorted part that are < subMax)
  while (right < n - 1 && arr[right + 1] < subMax) right++;

  return right - left + 1;
}

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])); // 5
console.log(findUnsortedSubarray([1, 2, 3, 4]));             // 0 (sorted)
console.log(findUnsortedSubarray([1]));                      // 0
```

</details>

---

### 🧩 Challenge 7: Palindrome Linked List

Check if a linked list is a palindrome.

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function isPalindromeList(head) {
  // Step 1: Find middle using slow/fast pointers
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half
  let prev = null;
  let curr = slow;
  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Compare first half and reversed second half
  let left = head;
  let right = prev; // prev is now head of reversed second half

  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
}
```

**Why it works:** Find the middle with slow/fast, reverse from the middle, then compare left-to-right and right-to-left simultaneously. Time: O(n), Space: O(1).

</details>

---

### 🧩 Challenge 8 (Hard): Minimum Size Subarray Sum

Find the minimum length subarray whose sum is ≥ target. (Sliding window + pointers)

```
Input:  target = 7, arr = [2, 3, 1, 2, 4, 3]
Output: 2  (subarray [4, 3] has sum ≥ 7 and length 2)
```

<details>
<summary>✅ Solution + Explanation</summary>

```javascript
function minSubArrayLen(target, arr) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right]; // expand window to the right

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1); // record window size
      sum -= arr[left]; // shrink window from the left
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
console.log(minSubArrayLen(4, [1, 4, 4]));           // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1]));    // 0 (impossible)
```

**Why it works:** Right pointer expands the window, left pointer shrinks it once the condition is met. Time: O(n), Space: O(1).

</details>

---

## 13. Cheat Sheet

### When to Use Multiple Pointers

| Signal in the problem | Likely pointer type |
|---|---|
| "Sorted array" + find a pair | Converging (left + right) |
| "Count unique values" | Same direction (slow + fast) |
| "Remove duplicates in-place" | Same direction (slow + fast) |
| "Is palindrome?" | Converging (left + right) |
| "Find middle of list" | Slow/fast (linked list) |
| "Detect cycle" | Slow/fast (linked list) |
| "Three sum / four sum" | Outer loop + converging inside |
| "Minimum subarray / window" | Sliding window (left + right) |

### Pointer Movement Rules

```
// Converging — target sum
sum === target → FOUND ✅
sum > target  → right--
sum < target  → left++

// Same direction — find uniques
arr[fast] !== arr[slow] → slow++, arr[slow] = arr[fast]
arr[fast] === arr[slow] → fast++ only (slow stays)

// Slow / fast — linked list
slow = slow.next        (1 step)
fast = fast.next.next   (2 steps)
```

### Template — Converging Pointers

```javascript
function twoPointerConverge(arr, target) {
  arr.sort((a, b) => a - b); // sort if needed
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let value = compute(arr[left], arr[right]);

    if (value === target) {
      return [arr[left], arr[right]]; // or do whatever is needed
    } else if (value > target) {
      right--;
    } else {
      left++;
    }
  }

  return null; // nothing found
}
```

### Template — Same Direction Pointers

```javascript
function twoPointerSameDir(arr) {
  if (arr.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < arr.length; fast++) {
    if (shouldUpdate(arr[slow], arr[fast])) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  return slow + 1;
}
```

---

## 🎯 Learning Path — From Beginner to Interview-Ready

Follow this exact order:

1. ✅ Understand WHY we need pointers (nested loops = slow)
2. ✅ Implement `sumZero` with converging pointers
3. ✅ Implement `countUniqueValues` with same-direction pointers
4. ✅ Implement `isPalindrome` on strings
5. ✅ Implement `averagePair` and `isSubsequence`
6. ✅ Understand Three Sum (outer loop + inner pointers)
7. ✅ Study Container With Most Water and Trapping Rain Water
8. ✅ Practice slow/fast pointers on linked lists
9. ✅ Solve all 8 challenges timed (30 min each max)
10. ✅ Re-solve each challenge from memory 1 week later

> 💡 **Interview tip:** When you see a problem involving a sorted array and pairs or triplets, say out loud: *"I think I can solve this with two pointers in O(n) instead of nested loops."* — This alone impresses most interviewers.

Good luck! 🚀