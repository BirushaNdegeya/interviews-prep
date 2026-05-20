# 🧠 JavaScript Subarrays — From Zero to Interview Master

> A complete guide covering every concept, pattern, and trick you need to dominate subarray problems in interviews.

---

## Table of Contents

1. [What Is a Subarray?](#1-what-is-a-subarray)
2. [Brute Force — The Naive Approach](#2-brute-force--the-naive-approach)
3. [Sliding Window — The Core Pattern](#3-sliding-window--the-core-pattern)
4. [Fixed vs. Dynamic Sliding Window](#4-fixed-vs-dynamic-sliding-window)
5. [Kadane's Algorithm — Maximum Subarray](#5-kadanes-algorithm--maximum-subarray)
6. [Prefix Sums — Powerful Preprocessing](#6-prefix-sums--powerful-preprocessing)
7. [Hash Maps + Prefix Sums](#7-hash-maps--prefix-sums)
8. [Two Pointers on Subarrays](#8-two-pointers-on-subarrays)
9. [Monotonic Deque (Advanced)](#9-monotonic-deque-advanced)
10. [Interview Cheat Sheet](#10-interview-cheat-sheet)
11. [🔥 Challenging Exercises](#11--challenging-exercises)

---

## 1. What Is a Subarray?

A **subarray** is a **contiguous** portion of an array. This is the key word: contiguous. Elements must be adjacent — no skipping.

```
arr = [1, 2, 3, 4, 5]

✅ Subarrays (contiguous):
[1], [2], [3, 4], [1, 2, 3], [2, 3, 4, 5], [1, 2, 3, 4, 5]

❌ NOT subarrays (not contiguous):
[1, 3], [2, 4, 5], [1, 5]   ← these are subsequences
```

### Subarray vs. Subsequence vs. Subset

| Term          | Contiguous? | Order matters? | Example from [1,2,3] |
|---------------|-------------|----------------|-----------------------|
| Subarray      | ✅ Yes      | ✅ Yes         | [1,2], [2,3]          |
| Subsequence   | ❌ No       | ✅ Yes         | [1,3], [1,2,3]        |
| Subset        | ❌ No       | ❌ No          | {1,3}, {2}            |

### How Many Subarrays Does an Array Have?

For an array of length `n`, the number of subarrays is:

```
n * (n + 1) / 2
```

```js
// For n = 5: 5 * 6 / 2 = 15 subarrays
// For n = 100: 100 * 101 / 2 = 5050 subarrays
```

---

## 2. Brute Force — The Naive Approach

The simplest approach: generate **every possible subarray** using two nested loops.

```js
function allSubarrays(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {       // start index
    for (let j = i; j < arr.length; j++) {     // end index
      result.push(arr.slice(i, j + 1));
    }
  }

  return result;
}

console.log(allSubarrays([1, 2, 3]));
// [[1], [1,2], [1,2,3], [2], [2,3], [3]]
```

### Brute Force Sum of Every Subarray

```js
function allSubarraySums(arr) {
  const sums = [];

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];            // extend subarray by one element
      sums.push(sum);
    }
  }

  return sums;
}

console.log(allSubarraySums([1, 2, 3]));
// [1, 3, 6, 2, 5, 3]
```

### Your Starting Code — Explained

```js
function maxSubarraySum(arr, num) {
  if (num > arr.length) return null;     // edge case: window too big

  var max = -Infinity;                   // handles negative arrays

  for (let i = 0; i < arr.length - num + 1; i++) {   // i: window start
    temp = 0;
    for (let j = 0; j < num; j++) {                   // j: window size
      temp += arr[i + j];               // sum elements in window
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
```

**Time Complexity: O(n × k)** — for each of the `n` windows, we sum `k` elements.

This is fine for small inputs, but we can do **much** better.

---

## 3. Sliding Window — The Core Pattern

The sliding window technique eliminates redundant work by **reusing** the previous window's sum.

### The Key Insight

```
arr = [2, 6, 9, 2, 1, 8, 5, 6, 3],  num = 3

Window 1: [2, 6, 9]  → sum = 17
Window 2: [6, 9, 2]  → sum = 17 - 2 + 2 = 17   (remove 2, add 2)
Window 3: [9, 2, 1]  → sum = 17 - 6 + 1 = 12   (remove 6, add 1)
...

Instead of re-summing 3 elements each time,
we just do: newSum = oldSum - leftElement + newRightElement
```

### Fixed-Size Sliding Window

```js
function maxSubarraySum(arr, num) {
  if (num > arr.length) return null;

  // Step 1: compute sum of first window
  let maxSum = 0;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  let currentSum = maxSum;

  // Step 2: slide the window forward
  for (let i = num; i < arr.length; i++) {
    currentSum = currentSum - arr[i - num] + arr[i];  // 🔑 the trick
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3); // 19
```

**Time Complexity: O(n)** — a massive improvement from O(n × k).

### Step-by-Step Trace

```
arr = [2, 6, 9, 2, 1, 8, 5, 6, 3],  num = 3

Initial window [2, 6, 9] → maxSum = 17, currentSum = 17

i=3: currentSum = 17 - arr[0] + arr[3] = 17 - 2 + 2  = 17  → max = 17
i=4: currentSum = 17 - arr[1] + arr[4] = 17 - 6 + 1  = 12  → max = 17
i=5: currentSum = 12 - arr[2] + arr[5] = 12 - 9 + 8  = 11  → max = 17
i=6: currentSum = 11 - arr[3] + arr[6] = 11 - 2 + 5  = 14  → max = 17
i=7: currentSum = 14 - arr[4] + arr[7] = 14 - 1 + 6  = 19  → max = 19 ✅
i=8: currentSum = 19 - arr[5] + arr[8] = 19 - 8 + 3  = 14  → max = 19

Answer: 19
```

---

## 4. Fixed vs. Dynamic Sliding Window

### Fixed Window Size

Used when the problem specifies an **exact window size** (like "find the max sum of k elements").

```js
// Pattern: fixed k
for (let i = k; i < arr.length; i++) {
  currentSum = currentSum - arr[i - k] + arr[i];
}
```

### Dynamic Window Size

Used when the window **grows and shrinks** based on a condition (like "smallest subarray with sum ≥ target").

```js
// Smallest subarray with sum >= target
function minSubarrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];                     // expand window

    while (sum >= target) {                 // shrink from left
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

minSubarrayLen(7, [2, 3, 1, 2, 4, 3]); // 2 → [4, 3]
```

**When to grow:** always (move `right` pointer)
**When to shrink:** when the window violates the condition (move `left` pointer)

### Dynamic Window — Longest Subarray with Distinct Elements

```js
function longestUniqueSubarray(arr) {
  const seen = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < arr.length; right++) {
    if (seen.has(arr[right]) && seen.get(arr[right]) >= left) {
      left = seen.get(arr[right]) + 1;    // shrink: jump past duplicate
    }
    seen.set(arr[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

longestUniqueSubarray([1, 3, 1, 3, 2, 3]); // 3 → [1, 3, 2] or [3, 2, 3]... wait:
// [1,3,2] length 3 ✅
```

---

## 5. Kadane's Algorithm — Maximum Subarray

One of the most famous interview algorithms. Finds the **maximum sum subarray** in O(n).

### The Logic

At each position, you choose: "Should I extend the existing subarray, or start fresh here?"

```js
function maxSubarrayKadane(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // Either extend the current subarray, or start a new one here
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

maxSubarrayKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6 → [4, -1, 2, 1]
```

### Trace Through

```
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: currentSum = -2,  maxSum = -2
i=1: currentSum = max(1, -2+1)  = max(1,-1)  = 1,   maxSum = 1
i=2: currentSum = max(-3, 1-3)  = max(-3,-2) = -2,  maxSum = 1
i=3: currentSum = max(4, -2+4)  = max(4,2)   = 4,   maxSum = 4
i=4: currentSum = max(-1, 4-1)  = max(-1,3)  = 3,   maxSum = 4
i=5: currentSum = max(2, 3+2)   = max(2,5)   = 5,   maxSum = 5
i=6: currentSum = max(1, 5+1)   = max(1,6)   = 6,   maxSum = 6  ✅
i=7: currentSum = max(-5, 6-5)  = max(-5,1)  = 1,   maxSum = 6
i=8: currentSum = max(4, 1+4)   = max(4,5)   = 5,   maxSum = 6

Answer: 6
```

### Kadane's with Subarray Indices

```js
function maxSubarrayWithIndices(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  let start = 0, end = 0, tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > currentSum + arr[i]) {
      currentSum = arr[i];
      tempStart = i;                        // potential new start
    } else {
      currentSum += arr[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return { maxSum, subarray: arr.slice(start, end + 1) };
}

maxSubarrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
// { maxSum: 6, subarray: [4, -1, 2, 1] }
```

---

## 6. Prefix Sums — Powerful Preprocessing

A **prefix sum** array stores the cumulative sum up to each index. This allows any subarray sum to be computed in **O(1)** after O(n) preprocessing.

### Building a Prefix Sum Array

```js
function buildPrefixSum(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
}

// arr    = [2, 4, 6, 8, 10]
// prefix = [0, 2, 6, 12, 20, 30]
//            ^  ^  ^   ^   ^   ^
//            |  |  |   |   |   sum of all
//            0  2  2+4 ...
```

### Subarray Sum in O(1)

```
sum(i, j) = prefix[j+1] - prefix[i]
```

```js
function subarraySum(arr, i, j) {
  const prefix = buildPrefixSum(arr);
  return prefix[j + 1] - prefix[i];
}

subarraySum([2, 4, 6, 8, 10], 1, 3); // 4+6+8 = 18
// prefix[4] - prefix[1] = 20 - 2 = 18 ✅
```

### Range Sum Queries

```js
class RangeSumQuery {
  constructor(nums) {
    this.prefix = [0];
    for (const n of nums) {
      this.prefix.push(this.prefix.at(-1) + n);
    }
  }

  // sum of nums[left...right] inclusive
  query(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}

const rsq = new RangeSumQuery([1, 2, 3, 4, 5]);
rsq.query(1, 3); // 2+3+4 = 9
rsq.query(0, 4); // 1+2+3+4+5 = 15
```

---

## 7. Hash Maps + Prefix Sums

This combo solves problems like: **"How many subarrays sum to k?"**

### Count Subarrays with Sum = k

```js
function subarrayCount(nums, k) {
  // map: prefixSum → how many times we've seen it
  const prefixCounts = new Map();
  prefixCounts.set(0, 1);   // empty prefix with sum 0

  let count = 0;
  let sum = 0;

  for (const num of nums) {
    sum += num;

    // If (sum - k) has been seen before, those prefixes form valid subarrays
    if (prefixCounts.has(sum - k)) {
      count += prefixCounts.get(sum - k);
    }

    prefixCounts.set(sum, (prefixCounts.get(sum) || 0) + 1);
  }

  return count;
}

subarrayCount([1, 1, 1], 2); // 2 → [1,1] at index 0-1, and [1,1] at index 1-2
subarrayCount([1, 2, 3], 3); // 2 → [3] and [1,2]
```

### Why It Works

```
At index i, if prefix[i] - prefix[j] = k, then subarray (j+1, i) sums to k.
So we need: prefix[j] = prefix[i] - k
We look up (currentSum - k) in our map!
```

---

## 8. Two Pointers on Subarrays

Two pointers work on **sorted arrays** or when you need to find a pair or triplet within a subarray.

### Subarray Product Less Than k

```js
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;

  let count = 0;
  let product = 1;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];                   // expand

    while (product >= k) {                   // shrink
      product /= nums[left];
      left++;
    }

    // All subarrays ending at `right` starting from `left` are valid
    count += right - left + 1;
  }

  return count;
}

numSubarrayProductLessThanK([10, 5, 2, 6], 100);
// 8 subarrays: [10],[5],[2],[6],[10,5],[5,2],[2,6],[5,2,6]
```

---

## 9. Monotonic Deque (Advanced)

Use a **deque (double-ended queue)** when you need the **maximum or minimum in a sliding window** efficiently.

### Sliding Window Maximum

Given an array and window size k, return the maximum of each window.

```js
function maxSlidingWindow(nums, k) {
  const deque = [];   // stores indices, decreasing order of values
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside the window
    while (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove smaller elements (they can never be the max)
    while (deque.length && nums[deque.at(-1)] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Window is fully formed
    if (i >= k - 1) {
      result.push(nums[deque[0]]);   // front of deque = max
    }
  }

  return result;
}

maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
// [3, 3, 5, 5, 6, 7]
```

### Deque Trace

```
k = 3, nums = [1, 3, -1, -3, 5, 3, 6, 7]

i=0: deque=[0]            (val=1)   window not full yet
i=1: deque=[1]            (val=3)   popped 0 (1 < 3), window not full
i=2: deque=[1,2]          (val=3,-1) window full → result=[3]
i=3: deque=[1,2,3]        (val=3,-1,-3) → result=[3,3]
i=4: deque=[4]            (val=5) popped all smaller → result=[3,3,5]
...
```

---

## 10. Interview Cheat Sheet

```
PROBLEM TYPE                          → TECHNIQUE
──────────────────────────────────────────────────────
Fixed window size, find max/min sum   → Fixed Sliding Window O(n)
Variable window, find shortest/longest→ Dynamic Sliding Window O(n)
Max sum subarray (any size)           → Kadane's Algorithm O(n)
Sum of any subarray range             → Prefix Sum O(1) query
Count subarrays with sum = k          → Prefix Sum + Hash Map O(n)
Max/min in every sliding window       → Monotonic Deque O(n)
Subarray with two-condition constraint→ Two Pointers O(n)
```

### Red Flags in Interviews

- "Find subarray with **exact** sum k" → Prefix Sum + HashMap (not sliding window!)
- "All negative numbers" → Kadane's needs `max = arr[0]`, not 0
- "At most k distinct" → Dynamic window with a map
- "Circular array" → Run Kadane's twice or use total sum trick

---

## 11. 🔥 Challenging Exercises

Work through these from top to bottom. Each builds on the last.

---

### 🟢 Beginner

**Exercise 1 — Average of Subarrays**
> Given an array of integers and a number k, return an array of averages of each contiguous subarray of size k.

```js
// Input: [1, 3, 2, 6, -1, 4, 1, 8, 2], k = 5
// Output: [2.2, 2.8, 2.4, 3.6, 2.8]
function findAverages(arr, k) {
  // Your solution here
}
```

<details>
<summary>💡 Hint</summary>

Use a fixed sliding window. Divide `currentSum` by `k` at each window position.

</details>

---

**Exercise 2 — Contains Duplicate in Window**
> Given an array and integer k, return true if there are two distinct indices i and j such that `arr[i] === arr[j]` and `abs(i-j) <= k`.

```js
// Input: [1, 2, 3, 1], k = 3 → true
// Input: [1, 2, 3, 1, 2, 3], k = 2 → false
function containsNearbyDuplicate(nums, k) {
  // Your solution here
}
```

---

### 🟡 Intermediate

**Exercise 3 — Longest Subarray with Sum ≤ k**
> Find the length of the longest subarray whose sum is less than or equal to k. Array contains only positive integers.

```js
// Input: [3, 1, 2, 7, 4, 2, 1, 1, 5], k = 8
// Output: 4 → [2, 1, 1, 5]? No: [3,1,2] sum=6≤8, length=3
//         → [1, 2, 1, 1] = 5, length = 4  ✅
function longestSubarrayWithSumAtMostK(arr, k) {
  // Your solution here
}
```

---

**Exercise 4 — Number of Subarrays with Sum Exactly k**
> Given an array of integers and integer k, return the number of contiguous subarrays that sum to exactly k. Array can contain negative numbers.

```js
// Input: [1, 2, 3], k = 3 → 2
// Input: [1, 1, 1], k = 2 → 2
function subarraySumEqualsK(nums, k) {
  // Your solution here
}
```

<details>
<summary>💡 Hint</summary>

Prefix sum + HashMap. Sliding window won't work here because of negative numbers!

</details>

---

**Exercise 5 — Maximum Product Subarray**
> Find the contiguous subarray that has the largest product.

```js
// Input: [2, 3, -2, 4]   → 6 (subarray [2,3])
// Input: [-2, 0, -1]     → 0
// Input: [-2, 3, -4]     → 24 (all three)
function maxProduct(nums) {
  // Your solution here
  // 💡 Track both max AND min at each step (negative × negative = positive!)
}
```

---

### 🔴 Advanced

**Exercise 6 — Minimum Window Substring**
> Given strings s and t, find the minimum window in s that contains all characters of t.

```js
// Input: s = "ADOBECODEBANC", t = "ABC" → "BANC"
// Input: s = "a", t = "a" → "a"
// Input: s = "a", t = "aa" → ""
function minWindow(s, t) {
  // Your solution here
  // 💡 Dynamic sliding window with two frequency maps
}
```

---

**Exercise 7 — Longest Subarray After Deleting One Element**
> Given a binary array, return the length of the longest subarray of 1s after deleting exactly one element.

```js
// Input: [1,1,0,1]     → 3
// Input: [0,1,1,1,0,1,1,0,1] → 5
// Input: [1,1,1]       → 2 (must delete one)
function longestSubarray(nums) {
  // Your solution here
  // 💡 Sliding window, allow at most one 0 in the window
}
```

---

**Exercise 8 — Sliding Window Maximum** *(Hard)*
> Return an array of the maximum value in each sliding window of size k.

```js
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
function maxSlidingWindow(nums, k) {
  // Your solution here
  // 💡 Monotonic deque — see Section 9
}
```

---

**Exercise 9 — Subarray Sum Divisible by k** *(Hard)*
> Count the number of subarrays whose sum is divisible by k.

```js
// Input: [4,5,0,-2,-3,1], k = 5 → 7
function subarraysDivByK(nums, k) {
  // Your solution here
  // 💡 Prefix sum with modular arithmetic: (prefix % k + k) % k
}
```

---

**Exercise 10 — Maximum Sum of Two Non-Overlapping Subarrays** *(Expert)*
> Given array nums and integers firstLen and secondLen, return the maximum sum of elements in two non-overlapping subarrays — one of length firstLen and one of length secondLen.

```js
// Input: nums = [0,6,5,2,2,5,1,9,4], firstLen=1, secondLen=2 → 20
// The two subarrays are [9] (length 1) and [6,5] (length 2)
function maxSumTwoNoOverlap(nums, firstLen, secondLen) {
  // Your solution here
  // 💡 Prefix sum + track best window seen so far
  // Try: best first window to the LEFT of current second window
  //  AND best first window to the RIGHT (swap the two lengths)
}
```

---

## Answer Key (Compact Solutions)

```js
// Exercise 1
function findAverages(arr, k) {
  const result = [];
  let sum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  result.push(sum / k);
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    result.push(sum / k);
  }
  return result;
}

// Exercise 2
function containsNearbyDuplicate(nums, k) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;
    map.set(nums[i], i);
  }
  return false;
}

// Exercise 3
function longestSubarrayWithSumAtMostK(arr, k) {
  let left = 0, sum = 0, maxLen = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum > k) sum -= arr[left++];
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// Exercise 4
function subarraySumEqualsK(nums, k) {
  const map = new Map([[0, 1]]);
  let count = 0, sum = 0;
  for (const n of nums) {
    sum += n;
    count += map.get(sum - k) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}

// Exercise 5
function maxProduct(nums) {
  let maxP = nums[0], minP = nums[0], result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) [maxP, minP] = [minP, maxP];
    maxP = Math.max(nums[i], maxP * nums[i]);
    minP = Math.min(nums[i], minP * nums[i]);
    result = Math.max(result, maxP);
  }
  return result;
}

// Exercise 6
function minWindow(s, t) {
  const need = {}, have = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let formed = 0, required = Object.keys(need).length;
  let left = 0, min = [Infinity, 0, 0];
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    have[c] = (have[c] || 0) + 1;
    if (need[c] && have[c] === need[c]) formed++;
    while (formed === required) {
      if (right - left + 1 < min[0]) min = [right - left + 1, left, right];
      have[s[left]]--;
      if (need[s[left]] && have[s[left]] < need[s[left]]) formed--;
      left++;
    }
  }
  return min[0] === Infinity ? "" : s.slice(min[1], min[2] + 1);
}

// Exercise 7
function longestSubarray(nums) {
  let left = 0, zeros = 0, maxLen = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) { if (nums[left++] === 0) zeros--; }
    maxLen = Math.max(maxLen, right - left);   // -1 for deleted element
  }
  return maxLen;
}

// Exercise 8
function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

// Exercise 9
function subarraysDivByK(nums, k) {
  const map = new Map([[0, 1]]);
  let count = 0, sum = 0;
  for (const n of nums) {
    sum = ((sum + n) % k + k) % k;
    count += map.get(sum) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}

// Exercise 10
function maxSumTwoNoOverlap(nums, L, M) {
  const n = nums.length;
  const prefix = [0];
  for (const n of nums) prefix.push(prefix.at(-1) + n);
  const rangeSum = (i, j) => prefix[j + 1] - prefix[i];

  let maxL = 0, maxM = 0, result = 0;
  for (let i = L + M - 1; i < n; i++) {
    maxL = Math.max(maxL, rangeSum(i - L - M + 1, i - M));
    maxM = Math.max(maxM, rangeSum(i - L - M + 1, i - L));
    result = Math.max(result,
      maxL + rangeSum(i - M + 1, i),
      maxM + rangeSum(i - L + 1, i)
    );
  }
  return result;
}
```

---

## Final Notes

- Always clarify: can the array have **negative numbers**? This determines sliding window vs Kadane's/prefix sum.
- Always clarify: is the window **fixed** or **variable**?
- When you see "subarray" + "count" → think **prefix sum + hashmap**.
- When you see "max/min of window" → think **monotonic deque**.
- Practice until you can code a sliding window in under 5 minutes. It appears in ~30% of array interview questions.

**Good luck. You've got this. 🚀**