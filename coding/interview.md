# JavaScript Interview Questions

> Click the `<details>` blocks to reveal hints and solutions.

---

## Q1 — Blinking Lights Rhythm
**Topic:** Arrays · Boolean Logic

Given an array of boolean values representing on/off states, simulate and return the sequence of active lights at each tick following an alternating rhythm pattern.

<details>
<summary>💡 Hint & Solution</summary>

### Approach
Iterate through the boolean array and track which lights should be on at each step. Use modulo or index parity to determine alternating rhythm. Think of it as a state machine: each index has a fixed on/off state, and you walk through them.

### Key Insight
The light at index `i` is active when both `arr[i]` is `true` AND `i` matches the expected rhythm phase. Use `i % 2` (or a custom interval) to model the alternating pattern.

### Solution

```javascript
function getLightRhythm(lights, interval = 2) {
  return lights.map((on, i) => on && i % interval === 0);
}

// Or with a class:
class LightSequence {
  constructor(pattern) { this.pattern = pattern; }

  getActive(tick) {
    return this.pattern
      .map((on, i) => on && (i + tick) % 2 === 0);
  }
}
```

### Complexity
- **Time:** O(n)
- **Space:** O(n)

</details>

---

## Q2 — Cupboard Obstacle Check
**Topic:** Stack · Simulation

Given an array of objects stacked in a cupboard, determine if a specific element can be removed given that no element placed before it (blocking it) can be bypassed.

<details>
<summary>💡 Hint & Solution</summary>

### Approach
Model the cupboard as a stack or ordered list. An element at index `i` can only be removed if all elements at indices `0..i-1` that are "in front of" it have been removed first. Use a pointer or set to track remaining items.

### Key Insight
This is a stack/queue access problem. Iterate from the front; if you find an obstacle before the target index, return `false` immediately. A single linear scan is enough.

### Solution

```javascript
function canRemove(cupboard, target) {
  const targetIdx = cupboard.indexOf(target);
  if (targetIdx === -1) return false;

  for (let i = 0; i < targetIdx; i++) {
    if (cupboard[i] !== null) return false; // obstacle
  }
  return true;
}

// Remove it:
function remove(cupboard, target) {
  if (!canRemove(cupboard, target)) return null;
  const idx = cupboard.indexOf(target);
  cupboard[idx] = null;
  return target;
}
```

### Complexity
- **Time:** O(n)
- **Space:** O(1)

</details>

---

## Q3 — Maximum Revenue Over K Consecutive Months
**Topic:** Sliding Window · Subarray

Given an array of 12 monthly revenues, find the maximum total revenue achievable over any `k` consecutive months using an optimal algorithm.

<details>
<summary>💡 Hint & Solution</summary>

### Approach
Use the sliding window technique. Compute the sum of the first `k` elements, then slide the window one step at a time: subtract the element leaving the left, add the element entering the right. Track the maximum seen.

### Key Insight
A naive O(n·k) double loop recalculates sums from scratch. The sliding window avoids that by reusing the previous sum — only two operations per step, making it O(n).

### Solution

```javascript
function maxRevenueKMonths(revenues, k) {
  let windowSum = revenues.slice(0, k)
    .reduce((a, b) => a + b, 0);
  let max = windowSum;

  for (let i = k; i < revenues.length; i++) {
    windowSum += revenues[i] - revenues[i - k];
    if (windowSum > max) max = windowSum;
  }
  return max;
}

// Example:
maxRevenueKMonths([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8], 4);
// → 28  (months 6-9: 9+2+6+5)
```

### Complexity
- **Time:** O(n)
- **Space:** O(1)

</details>

---

## Q4 — Sort and Sum First Two (No `sort()`)
**Topic:** Sorting Algorithms · No built-ins

Sort `[4, 8, 39, 38, 94]` without using `Array.prototype.sort()`, then return the sum of the two smallest elements. Implement an efficient sorting algorithm from scratch.

<details>
<summary>💡 Hint & Solution</summary>

### Approach
Implement a fast sorting algorithm manually. Quicksort or merge sort are both O(n log n) average. For a small array you could also use insertion sort (simple, O(n²) worst but fast in practice for n < 20). After sorting ascending, sum `arr[0] + arr[1]`.

### Key Insight
The question tests whether you know sorting internals. Quicksort is the go-to: pick a pivot, partition smaller/larger elements, recurse. After sorting ascending, the first two elements are the minimum.

### Solution

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left  = arr.filter(x => x < pivot);
  const mid   = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...mid, ...quickSort(right)];
}

function sumFirstTwo(arr) {
  const sorted = quickSort([...arr]);
  return sorted[0] + sorted[1];
}

sumFirstTwo([4, 8, 39, 38, 94]); // → 12
```

### Complexity
- **Time:** O(n log n) average
- **Space:** O(n)

</details>

---

## Q5 — Date Format Normalizer
**Topic:** Strings · Regular Expressions

Given a string containing dates in 5 different formats (e.g. `DD/MM/YYYY`, `MM-DD-YY`, `Month DD YYYY`, `YYYY.MM.DD`, Unix timestamp), parse and convert all of them into a single ISO 8601 format `YYYY-MM-DD`.

<details>
<summary>💡 Hint & Solution</summary>

### Approach
Define a regex for each of the 5 known formats. Use `String.replace()` or `matchAll()` to find each pattern and transform it. Use a lookup object to convert month names to numbers. Process formats in specificity order (most specific first) to avoid false matches.

### Key Insight
The key is building a dispatcher: try each regex in order, and when one matches, apply its specific transformation. Avoid `new Date()` for parsing — it is inconsistent across locales. Parse the parts manually.

### Solution

```javascript
const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04',
  may: '05', jun: '06', jul: '07', aug: '08',
  sep: '09', oct: '10', nov: '11', dec: '12'
};

const formats = [
  // YYYY.MM.DD or YYYY-MM-DD
  [/\b(\d{4})[.\-](\d{2})[.\-](\d{2})\b/g,
   (_, y, m, d) => `${y}-${m}-${d}`],

  // DD/MM/YYYY
  [/\b(\d{2})\/(\d{2})\/(\d{4})\b/g,
   (_, d, m, y) => `${y}-${m}-${d}`],

  // Month DD, YYYY  (e.g. January 5, 2023)
  [/\b([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})\b/g,
   (_, mon, d, y) => {
     const m = MONTHS[mon.slice(0, 3).toLowerCase()];
     return `${y}-${m}-${d.padStart(2, '0')}`;
   }],

  // Unix timestamp (10 digits)
  [/\b(\d{10})\b/g,
   (_, ts) => new Date(+ts * 1000).toISOString().slice(0, 10)]
];

function normalizeDates(str) {
  let result = str;
  for (const [rx, fn] of formats) {
    result = result.replace(rx, fn);
  }
  return result;
}

// Example:
normalizeDates("Order placed on 15/04/2023 and shipped on 2023.04.20");
// → "Order placed on 2023-04-15 and shipped on 2023-04-20"
```

### Complexity
- **Time:** O(n · f) where f = number of formats
- **Space:** O(n)

</details>

---

## Q6 — Custom Array Selector Class
**Topic:** OOP · Array · Method Chaining

Implement a class `SmartSelect` wrapping an array that exposes the methods: `filter(predicate)`, `map(fn)`, `groupBy(key)`, `unique()`, and `toSorted()` — all without mutating the original array. Discuss method chaining.

<details>
<summary>💡 Hint & Solution</summary>

### Approach
Return a new `SmartSelect` instance from each method so calls can be chained. Store the data immutably (copy on construction). `groupBy` should return a plain object keyed by the group value. `unique()` uses a `Set` internally.

### Key Insight
The fluent builder / method chaining pattern is the core concept. Each method returns a new instance wrapping the transformed data. O(n) per operation, and chaining does not add extra passes since each step wraps an already-transformed array.

### Solution

```javascript
class SmartSelect {
  #data;

  constructor(arr) {
    this.#data = [...arr]; // never mutate the original
  }

  filter(pred)    { return new SmartSelect(this.#data.filter(pred)); }
  map(fn)         { return new SmartSelect(this.#data.map(fn)); }
  unique()        { return new SmartSelect([...new Set(this.#data)]); }

  toSorted(compareFn) {
    return new SmartSelect([...this.#data].sort(compareFn));
  }

  groupBy(key) {
    return this.#data.reduce((acc, item) => {
      const k = item[key];
      (acc[k] ??= []).push(item);
      return acc;
    }, {});
  }

  toArray() { return [...this.#data]; }
}

// Method chaining example:
new SmartSelect([3, 1, 2, 1, 3])
  .unique()
  .toSorted((a, b) => a - b)
  .map(x => x * 10)
  .toArray();
// → [10, 20, 30]

// groupBy example:
new SmartSelect([
  { name: 'Alice', dept: 'eng' },
  { name: 'Bob',   dept: 'hr'  },
  { name: 'Carol', dept: 'eng' },
]).groupBy('dept');
// → { eng: [{...Alice}, {...Carol}], hr: [{...Bob}] }
```

### Complexity
- **Time:** O(n) per method
- **Space:** O(n) per step

</details>

---

*Good luck with your interview!*