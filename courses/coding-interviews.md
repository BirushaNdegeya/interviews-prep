# 🧠 Coding Interview Prep — Full Course
> Based on the freeCodeCamp Coding Interview Prep curriculum  
> Covers: Algorithms · Data Structures · Take-Home Projects · Problem Solving Patterns

---

## 📋 Table of Contents

1. [How to Use This Course](#how-to-use-this-course)
2. [Module 1: Foundations & Big O Notation](#module-1-foundations--big-o-notation)
3. [Module 2: Data Structures](#module-2-data-structures)
   - Stacks & Queues
   - Linked Lists
   - Hash Tables
   - Trees & Binary Search Trees
   - Heaps
   - Graphs
   - Tries
4. [Module 3: Algorithms](#module-3-algorithms)
   - Sorting Algorithms
   - Searching Algorithms
   - Recursion & Backtracking
   - Dynamic Programming
   - Greedy Algorithms
   - Divide & Conquer
5. [Module 4: Problem-Solving Patterns](#module-4-problem-solving-patterns)
6. [Module 5: Take-Home Projects](#module-5-take-home-projects)
7. [Module 6: Mathematics & Number Theory (Project Euler)](#module-6-mathematics--number-theory)
8. [Module 7: Interview Strategy & Mindset](#module-7-interview-strategy--mindset)
9. [Module 8: Practice Problems by Topic](#module-8-practice-problems-by-topic)
10. [Quick Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## How to Use This Course

This course mirrors the three pillars of the freeCodeCamp Coding Interview Prep section:

| Section | What You'll Learn |
|---|---|
| **Algorithms** | Sorting, searching, recursion, DP, graph traversal |
| **Data Structures** | Stacks, queues, trees, graphs, tries, heaps |
| **Take-Home Projects** | Real-world portfolio projects |

**Recommended Study Plan:**

| Week | Focus |
|---|---|
| 1–2 | Big O, Arrays, Strings, Hashmaps |
| 3–4 | Linked Lists, Stacks, Queues |
| 5–6 | Trees, Heaps, Graphs |
| 7–8 | Sorting & Searching Algorithms |
| 9–10 | Recursion & Dynamic Programming |
| 11–12 | Problem Patterns + Mock Interviews |

> 💡 **Pro Tip:** Use a whiteboard or plain notepad to practice. Most coding interviews restrict IDE use.

---

## Module 1: Foundations & Big O Notation

### 1.1 Why Big O Matters

Big O notation describes the **worst-case performance** of an algorithm in terms of time and space as input size `n` grows.

### 1.2 Time Complexity Reference Table

| Big O | Name | Example |
|---|---|---|
| `O(1)` | Constant | Array index access |
| `O(log n)` | Logarithmic | Binary search |
| `O(n)` | Linear | Linear search |
| `O(n log n)` | Linearithmic | Merge sort, heapsort |
| `O(n²)` | Quadratic | Bubble sort, nested loops |
| `O(2ⁿ)` | Exponential | Recursive Fibonacci |
| `O(n!)` | Factorial | Permutations |

### 1.3 Rules for Calculating Big O

1. **Drop constants** — `O(2n)` → `O(n)`
2. **Drop lower order terms** — `O(n² + n)` → `O(n²)`
3. **Different inputs = different variables** — `O(a + b)` for two separate arrays
4. **Nested loops multiply** — two nested loops over same array = `O(n²)`

### 1.4 Space Complexity

Space complexity tracks **memory usage** — includes:
- Variables declared
- Data structures created
- Call stack frames (recursion)

```javascript
// O(1) space — no extra data structure
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// O(n) space — new array created
function doubleArray(arr) {
  return arr.map(x => x * 2);
}
```

### 1.5 Practice: Identify the Complexity

```javascript
// What is the Big O of this function?
function mystery(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      result += i + j;
    }
  }
  return result;
}
// Answer: O(n²) — nested loops, both dependent on n
```

---

## Module 2: Data Structures

### 2.1 Stacks

A **Stack** is a Last-In-First-Out (LIFO) data structure.

**Core Operations:** `push`, `pop`, `peek`, `isEmpty`  
**Time Complexity:** All O(1)

**Use Cases:** Undo/redo, call stack, balanced parentheses, backtracking.

```javascript
class Stack {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  size() {
    return this.data.length;
  }
}

// Usage
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop());  // 3
console.log(stack.size()); // 2
```

**Classic Stack Problem — Balanced Parentheses:**

```javascript
function isBalanced(str) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (let char of str) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (')]}'.includes(char)) {
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isBalanced("({[]})"));  // true
console.log(isBalanced("({[})"));   // false
```

---

### 2.2 Queues

A **Queue** is a First-In-First-Out (FIFO) data structure.

**Core Operations:** `enqueue`, `dequeue`, `front`, `isEmpty`  
**Time Complexity:** All O(1)

**Use Cases:** BFS traversal, task scheduling, printer queues.

```javascript
class Queue {
  constructor() {
    this.data = [];
  }

  enqueue(value) {
    this.data.push(value);
  }

  dequeue() {
    return this.data.shift();
  }

  front() {
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  size() {
    return this.data.length;
  }
}
```

> ⚠️ `Array.shift()` is O(n) because it re-indexes all elements. For performance-critical queues, use a **linked list** or **deque** (double-ended queue).

---

### 2.3 Linked Lists

A **Linked List** is a sequence of nodes where each node stores data and a pointer to the next node.

**Types:**
- **Singly Linked** — one pointer (`next`)
- **Doubly Linked** — two pointers (`next`, `prev`)
- **Circular** — tail points back to head

**Core Operations & Complexity:**

| Operation | Singly | Doubly |
|---|---|---|
| Access by index | O(n) | O(n) |
| Search | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) / O(1)* | O(1) |
| Delete at head | O(1) | O(1) |
| Delete at tail | O(n) | O(1) |

*O(1) if tail pointer is maintained

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  unshift(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next, prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
}
```

**Classic Linked List Patterns:**

```javascript
// Detect a cycle — Floyd's Tortoise & Hare
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Find middle of linked list
function findMiddle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // slow is at the middle
}
```

---

### 2.4 Hash Tables

A **Hash Table** (or Hash Map) maps keys to values using a **hash function**.

**Average Time Complexity:**

| Operation | Average | Worst |
|---|---|---|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

Worst case occurs when all keys hash to the same index (**collision**).

**Collision Resolution Strategies:**
- **Separate Chaining** — store a linked list at each bucket
- **Open Addressing / Linear Probing** — find the next available slot

```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let pair of this.keyMap[index]) {
        if (pair[0] === key) return pair[1];
      }
    }
    return undefined;
  }

  keys() {
    const keysArr = [];
    for (let bucket of this.keyMap) {
      if (bucket) {
        for (let pair of bucket) {
          if (!keysArr.includes(pair[0])) keysArr.push(pair[0]);
        }
      }
    }
    return keysArr;
  }
}
```

**Hash Map in Interviews — Frequency Counter Pattern:**

```javascript
// Are two strings anagrams?
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const freq = {};
  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("rat", "car"));       // false
```

---

### 2.5 Trees & Binary Search Trees

A **Tree** is a hierarchical data structure with a root and child nodes.

**Key Terms:**
- **Root** — topmost node
- **Leaf** — node with no children
- **Height** — longest path from root to leaf
- **Depth** — distance of a node from root

**Binary Search Tree (BST) Property:**
- Left child < Parent
- Right child > Parent

**BST Time Complexity:**

| Operation | Average | Worst (unbalanced) |
|---|---|---|
| Insert | O(log n) | O(n) |
| Search | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

```javascript
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new BSTNode(value);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return this;
      if (value < current.value) {
        if (!current.left) { current.left = node; return this; }
        current = current.left;
      } else {
        if (!current.right) { current.right = node; return this; }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return false;
  }

  // Breadth-First Search (BFS)
  bfs() {
    const result = [], queue = [];
    if (!this.root) return result;
    queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  // Depth-First Search — In-Order (Left, Root, Right)
  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result; // Returns sorted order for BST!
  }

  // Depth-First Search — Pre-Order (Root, Left, Right)
  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      result.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  // Depth-First Search — Post-Order (Left, Right, Root)
  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.value);
    }
    traverse(this.root);
    return result;
  }
}
```

**BFS vs DFS — When to Use:**

| Scenario | Algorithm |
|---|---|
| Find shortest path | BFS |
| Check if path exists | DFS |
| Tree is wide/bushy | DFS (less memory) |
| Tree is deep | BFS (less memory) |
| Level-order processing | BFS |
| Serialize/clone a tree | Pre-order DFS |

---

### 2.6 Heaps (Priority Queues)

A **Binary Heap** is a complete binary tree where the parent is always greater (Max Heap) or smaller (Min Heap) than its children.

**Key Property (Max Heap):** Every parent ≥ its children

**Storage in Array:**
- Parent of index `n` → `Math.floor((n - 1) / 2)`
- Left child of index `n` → `2n + 1`
- Right child of index `n` → `2n + 2`

**Time Complexity:**

| Operation | Complexity |
|---|---|
| Insert | O(log n) |
| Remove Max/Min | O(log n) |
| Peek | O(1) |

```javascript
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);
    this._bubbleUp();
  }

  _bubbleUp() {
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[parentIdx] >= this.values[idx]) break;
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this._sinkDown();
    }
    return max;
  }

  _sinkDown() {
    let idx = 0;
    const length = this.values.length;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let swap = null;
      if (left < length && this.values[left] > this.values[idx]) swap = left;
      if (right < length && this.values[right] > (swap === null ? this.values[idx] : this.values[left])) swap = right;
      if (swap === null) break;
      [this.values[idx], this.values[swap]] = [this.values[swap], this.values[idx]];
      idx = swap;
    }
  }
}
```

---

### 2.7 Graphs

A **Graph** is a collection of **vertices** (nodes) connected by **edges**.

**Types:**
- **Directed vs Undirected**
- **Weighted vs Unweighted**
- **Cyclic vs Acyclic**

**Representation:**
- **Adjacency Matrix** — 2D array, O(1) edge lookup, O(V²) space
- **Adjacency List** — array/map of arrays, O(V + E) space

```javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // undirected
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  // DFS - Recursive
  dfsRecursive(start) {
    const result = [], visited = {};
    const dfs = (vertex) => {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) dfs(neighbor);
      });
    };
    dfs(start);
    return result;
  }

  // BFS
  bfs(start) {
    const queue = [start];
    const result = [], visited = { [start]: true };
    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}
```

**Dijkstra's Algorithm — Shortest Path (Weighted Graph):**

```javascript
function dijkstra(graph, start, end) {
  const distances = {}, previous = {}, pq = new MinPriorityQueue();

  for (let vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    previous[vertex] = null;
    pq.enqueue(vertex, distances[vertex]);
  }

  while (!pq.isEmpty()) {
    const { val: smallest } = pq.dequeue();
    if (smallest === end) {
      const path = [];
      let current = smallest;
      while (previous[current]) {
        path.push(current);
        current = previous[current];
      }
      return path.concat(current).reverse();
    }
    if (distances[smallest] !== Infinity) {
      for (let neighbor of graph[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
  }
  return distances;
}
```

---

### 2.8 Tries (Prefix Trees)

A **Trie** is a tree-like structure for storing strings character by character. Ideal for autocomplete, spell checkers, and prefix matching.

**Time Complexity:**

| Operation | Complexity |
|---|---|
| Insert | O(m) — m = word length |
| Search | O(m) |
| Prefix Search | O(m) |

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }

  // Return all words with a given prefix
  autocomplete(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    const results = [];
    const dfs = (n, word) => {
      if (n.isEndOfWord) results.push(word);
      for (let char in n.children) {
        dfs(n.children[char], word + char);
      }
    };
    dfs(node, prefix);
    return results;
  }
}
```

---

## Module 3: Algorithms

### 3.1 Sorting Algorithms

#### Bubble Sort — O(n²)

```javascript
function bubbleSort(arr) {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break; // Already sorted
  }
  return arr;
}
```

#### Selection Sort — O(n²)

```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
```

#### Insertion Sort — O(n²) avg, O(n) best

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
```

> 💡 Insertion sort is very efficient for **nearly-sorted arrays** and **small datasets**.

#### Merge Sort — O(n log n)

```javascript
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
```

#### Quick Sort — O(n log n) avg, O(n²) worst

```javascript
function pivot(arr, start = 0, end = arr.length - 1) {
  let pivotVal = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotVal) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIdx = pivot(arr, left, right);
    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
  }
  return arr;
}
```

#### Radix Sort — O(nk) — only for integers

```javascript
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  return Math.max(...nums.map(digitCount));
}

function radixSort(nums) {
  const maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let num of nums) {
      buckets[getDigit(num, k)].push(num);
    }
    nums = [].concat(...buckets);
  }
  return nums;
}
```

**Sorting Algorithm Comparison:**

| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) | ✅ |

---

### 3.2 Searching Algorithms

#### Linear Search — O(n)

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

#### Binary Search — O(log n) — requires sorted array

```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

---

### 3.3 Recursion & Backtracking

**Recursion** is when a function calls itself. Every recursive function needs:
1. A **base case** (stopping condition)
2. A **recursive case** (progress toward base case)

```javascript
// Factorial
function factorial(n) {
  if (n <= 1) return 1;       // base case
  return n * factorial(n - 1); // recursive case
}

// Fibonacci — O(2ⁿ) naive
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// Power set — all subsets of an array
function powerSet(arr, idx = 0) {
  if (idx === arr.length) return [[]];
  const rest = powerSet(arr, idx + 1);
  return rest.concat(rest.map(subset => [arr[idx], ...subset]));
}
```

**Backtracking — N-Queens:**

```javascript
function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  function isValid(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }

  backtrack(0);
  return solutions;
}
```

---

### 3.4 Dynamic Programming

**Dynamic Programming (DP)** solves problems by breaking them into overlapping subproblems and storing solutions (**memoization** or **tabulation**).

**Criteria for DP:**
1. Optimal substructure — optimal solution is built from optimal subproblems
2. Overlapping subproblems — same subproblems are solved repeatedly

#### Memoization (Top-Down)

```javascript
// Fibonacci with memoization — O(n)
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

#### Tabulation (Bottom-Up)

```javascript
// Fibonacci with tabulation — O(n)
function fibTab(n) {
  if (n <= 2) return 1;
  const table = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}
```

#### Classic DP: 0/1 Knapsack

```javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // Don't take item
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}
```

#### Classic DP: Longest Common Subsequence (LCS)

```javascript
function lcs(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

console.log(lcs("ABCBDAB", "BDCAB")); // 4 → "BCAB"
```

#### Classic DP: Coin Change

```javascript
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 5, 11], 15)); // 3 → [5, 5, 5]
```

---

### 3.5 Greedy Algorithms

A **Greedy Algorithm** makes the locally optimal choice at each step, hoping to find a global optimum.

```javascript
// Activity Selection Problem
function activitySelection(activities) {
  // Sort by end time
  activities.sort((a, b) => a[1] - b[1]);
  const selected = [activities[0]];

  for (let i = 1; i < activities.length; i++) {
    const lastEnd = selected[selected.length - 1][1];
    if (activities[i][0] >= lastEnd) {
      selected.push(activities[i]);
    }
  }
  return selected;
}

// Activities: [start, end]
console.log(activitySelection([[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]));
```

---

## Module 4: Problem-Solving Patterns

### 4.1 Frequency Counter

Use objects/sets to avoid nested loops. Converts O(n²) to O(n).

```javascript
// Same frequency check
function sameFrequency(num1, num2) {
  const str1 = String(num1), str2 = String(num2);
  if (str1.length !== str2.length) return false;
  const freq = {};
  for (let d of str1) freq[d] = (freq[d] || 0) + 1;
  for (let d of str2) {
    if (!freq[d]) return false;
    freq[d]--;
  }
  return true;
}
```

### 4.2 Multiple Pointers

Use two pointers moving toward each other or in the same direction.

```javascript
// Count unique values in sorted array
function countUniqueValues(arr) {
  if (!arr.length) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

// Two Sum (sorted array)
function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}
```

### 4.3 Sliding Window

Maintain a "window" of elements, sliding it across the array.

```javascript
// Max sum subarray of size k
function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let maxSum = 0, tempSum = 0;
  for (let i = 0; i < k; i++) maxSum += arr[i];
  tempSum = maxSum;
  for (let i = k; i < arr.length; i++) {
    tempSum = tempSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

// Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0, start = 0;
  for (let end = 0; end < s.length; end++) {
    if (seen.has(s[end]) && seen.get(s[end]) >= start) {
      start = seen.get(s[end]) + 1;
    }
    seen.set(s[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}
```

### 4.4 Divide and Conquer

Split the problem in half repeatedly.

```javascript
// Search in rotated sorted array
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) { // Left half is sorted
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else { // Right half is sorted
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
```

### 4.5 Pattern Summary

| Pattern | Problem Signals | Example |
|---|---|---|
| Frequency Counter | Compare values, anagrams, duplicates | isAnagram, sameFrequency |
| Multiple Pointers | Sorted array, pairs, unique values | twoSum, countUnique |
| Sliding Window | Contiguous subarray/string | max subarray sum, longest substring |
| Divide & Conquer | Sorted data, halving | binary search, merge sort |
| Dynamic Programming | Optimization, overlapping subproblems | knapsack, LCS, coin change |
| Backtracking | All solutions, constraints | N-Queens, permutations |
| BFS | Shortest path, level-order | maze solving, word ladder |
| DFS | Connectivity, path existence | island count, cycle detection |

---

## Module 5: Take-Home Projects

freeCodeCamp's take-home projects are designed to demonstrate real-world skills. Here are the key areas and what each tests:

### 5.1 Stock Price Checker

**Concepts:** REST APIs, caching, data normalization  
**Tasks:**
- Fetch real-time stock data from an API
- Cache results to avoid rate limiting
- Handle concurrent requests
- Return price comparisons

**Key Skills:** `async/await`, API integration, in-memory caching, error handling.

```javascript
// Example caching layer
const cache = new Map();
const CACHE_TTL = 60000; // 1 minute

async function getStockPrice(symbol) {
  const cacheKey = symbol.toUpperCase();
  if (cache.has(cacheKey)) {
    const { price, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_TTL) return price;
  }
  const response = await fetch(`https://api.example.com/stock/${cacheKey}`);
  const { price } = await response.json();
  cache.set(cacheKey, { price, timestamp: Date.now() });
  return price;
}
```

---

### 5.2 Message Board with Authentication

**Concepts:** Authentication, authorization, CRUD operations  
**Tasks:**
- User signup/login with hashed passwords
- JWT or session-based authentication
- CRUD for threads and replies
- Protect routes and data

**Key Skills:** bcrypt, JWT, middleware, MongoDB/SQL, REST API design.

```javascript
// Password hashing pattern
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
```

---

### 5.3 Issue Tracker

**Concepts:** Full-stack CRUD, filtering, field validation  
**Tasks:**
- Create, read, update, close issues
- Filter by status, assignee, priority
- Validate required fields
- Return proper status codes

---

### 5.4 Personal Library

**Concepts:** Database design, RESTful API, testing with Chai  
**Tasks:**
- Add/delete books
- Add/delete comments on books
- Functional tests with Chai

---

### 5.5 Sudoku Solver

**Concepts:** Constraint satisfaction, backtracking  
**Algorithm:**

```javascript
function solveSudoku(board) {
  const emptyCell = findEmpty(board);
  if (!emptyCell) return true; // Solved!
  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, String(num))) {
      board[row][col] = String(num);
      if (solveSudoku(board)) return true;
      board[row][col] = '.'; // Backtrack
    }
  }
  return false;
}

function findEmpty(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === '.') return [r, c];
    }
  }
  return null;
}

function isValid(board, row, col, num) {
  // Check row
  if (board[row].includes(num)) return false;
  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}
```

---

## Module 6: Mathematics & Number Theory

The freeCodeCamp curriculum includes hundreds of Project Euler problems. Here are the most important mathematical concepts:

### 6.1 Prime Numbers

```javascript
// Sieve of Eratosthenes — find all primes up to n
function sieve(n) {
  const primes = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  return primes.reduce((acc, isPrime, i) => isPrime ? acc.concat(i) : acc, []);
}

// Check if number is prime — O(√n)
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

### 6.2 GCD & LCM

```javascript
// Greatest Common Divisor — Euclidean Algorithm
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Least Common Multiple
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
```

### 6.3 Fibonacci Numbers

```javascript
// Fibonacci with BigInt for large numbers
function bigFib(n) {
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}
```

### 6.4 Number Theory Patterns

```javascript
// Sum of digits
function sumDigits(n) {
  return String(n).split('').reduce((sum, d) => sum + Number(d), 0);
}

// Check palindrome
function isPalindrome(n) {
  const s = String(n);
  return s === s.split('').reverse().join('');
}

// Collatz sequence length
function collatzLength(n) {
  let count = 1;
  while (n !== 1) {
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    count++;
  }
  return count;
}
```

---

## Module 7: Interview Strategy & Mindset

### 7.1 The UMPIRE Method (Interview Framework)

| Step | Action |
|---|---|
| **U**nderstand | Ask clarifying questions. What are the inputs/outputs? Edge cases? |
| **M**atch | What pattern does this look like? (DP? Graph? Sliding window?) |
| **P**lan | Outline your algorithm in pseudocode before coding |
| **I**mplement | Write clean, readable code |
| **R**eview | Test with examples, check edge cases |
| **E**valuate | State the time and space complexity |

### 7.2 Questions to Ask the Interviewer

- What are the constraints on input size?
- Can the input contain negative numbers / null / empty strings?
- Is the array sorted?
- Should I optimize for time or space?
- Are there any duplicates?

### 7.3 Thinking Out Loud

Always verbalize your thought process:

> "I'm thinking of using a hashmap here to store frequencies, which would reduce the time complexity from O(n²) to O(n). Does that approach make sense?"

### 7.4 Common Edge Cases to Test

- Empty input (`[]`, `""`, `null`)
- Single element
- All elements the same
- Already sorted / reverse sorted
- Negative numbers
- Very large numbers (overflow)
- Duplicate values

### 7.5 Common Mistakes to Avoid

- ❌ Starting to code before understanding the problem
- ❌ Forgetting to handle edge cases
- ❌ Not verifying your algorithm with an example before coding
- ❌ Silently debugging — narrate your thinking
- ❌ Panicking and giving up — show your reasoning process even if stuck
- ✅ Ask for hints if stuck — it's allowed and shows communication skills

---

## Module 8: Practice Problems by Topic

### Arrays & Strings

| Problem | Pattern | Difficulty |
|---|---|---|
| Two Sum | Hash Map | Easy |
| Best Time to Buy/Sell Stock | Sliding Window | Easy |
| Contains Duplicate | Hash Set | Easy |
| Maximum Subarray | Kadane's Algorithm | Medium |
| 3Sum | Two Pointers | Medium |
| Longest Palindromic Substring | Expand Around Center | Medium |
| Rotate Array | Math | Medium |
| Find Median from Data Stream | Two Heaps | Hard |

### Linked Lists

| Problem | Pattern | Difficulty |
|---|---|---|
| Reverse Linked List | Two Pointers | Easy |
| Detect Cycle | Floyd's Algorithm | Medium |
| Merge Two Sorted Lists | Two Pointers | Easy |
| Remove Nth from End | Fast/Slow Pointer | Medium |
| Reorder List | Find Middle + Reverse | Medium |
| LRU Cache | HashMap + DLL | Hard |

### Trees & Graphs

| Problem | Pattern | Difficulty |
|---|---|---|
| Max Depth of Binary Tree | DFS | Easy |
| Validate BST | DFS | Medium |
| Level Order Traversal | BFS | Medium |
| Course Schedule | Topological Sort | Medium |
| Number of Islands | DFS/BFS | Medium |
| Clone Graph | DFS + HashMap | Medium |
| Word Ladder | BFS | Hard |
| Serialize/Deserialize Tree | DFS | Hard |

### Dynamic Programming

| Problem | Pattern | Difficulty |
|---|---|---|
| Climbing Stairs | 1D DP | Easy |
| House Robber | 1D DP | Medium |
| Coin Change | 1D DP | Medium |
| Longest Common Subsequence | 2D DP | Medium |
| Word Break | DP + Trie | Medium |
| 0/1 Knapsack | 2D DP | Medium |
| Edit Distance | 2D DP | Hard |
| Burst Balloons | Interval DP | Hard |

---

## Quick Reference Cheat Sheet

### Data Structure Selection Guide

```
Need fast lookup by key?          → Hash Map / Hash Set
Need ordered data?                → BST / Sorted Array
Need LIFO?                        → Stack
Need FIFO?                        → Queue
Need min/max quickly?             → Heap (Priority Queue)
Need prefix/autocomplete?         → Trie
Need relationships/connections?   → Graph
Need hierarchical data?           → Tree
```

### Algorithm Selection Guide

```
Problem asks for shortest path?   → BFS (unweighted) / Dijkstra (weighted)
Problem asks for all solutions?   → Backtracking
Problem has overlapping subproblems? → Dynamic Programming
Problem involves sorted data?     → Binary Search / Two Pointers
Problem involves contiguous data? → Sliding Window
Problem asks for all arrangements? → Recursion + Backtracking
Problem involves connected components? → DFS / Union-Find
```

### JavaScript Tricks for Interviews

```javascript
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
```

### Complexity Cheat Sheet — Data Structures

| Structure | Access | Search | Insert | Delete |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Hash Table | N/A | O(1) avg | O(1) avg | O(1) avg |
| BST | O(log n) | O(log n) | O(log n) | O(log n) |
| Heap | N/A | O(n) | O(log n) | O(log n) |

---

## 🎯 Final Study Checklist

### Algorithms
- [ ] Bubble, Selection, Insertion Sort
- [ ] Merge Sort and Quick Sort
- [ ] Radix Sort
- [ ] Linear and Binary Search
- [ ] DFS and BFS
- [ ] Dijkstra's Algorithm
- [ ] Recursive thinking and call stacks
- [ ] Backtracking template
- [ ] Dynamic programming (memoization + tabulation)

### Data Structures
- [ ] Stack and Queue (array-based and linked list-based)
- [ ] Singly and Doubly Linked List (all operations)
- [ ] Hash Table (implementation + collision handling)
- [ ] Binary Search Tree (insert, search, traversals)
- [ ] Max/Min Heap (insert, extract)
- [ ] Graph (adjacency list, BFS, DFS)
- [ ] Trie (insert, search, autocomplete)

### Patterns
- [ ] Frequency Counter
- [ ] Multiple Pointers
- [ ] Sliding Window
- [ ] Fast & Slow Pointers
- [ ] Divide & Conquer
- [ ] DP template

### Interview Skills
- [ ] Can explain Big O for every solution
- [ ] Practice talking through problems out loud
- [ ] Time yourself: aim for 20-30 min per problem
- [ ] Solve 3-5 problems per day for 8-12 weeks
- [ ] Do at least 5 mock interviews

---

> 📚 **Resources:**
> - [freeCodeCamp Coding Interview Prep](https://www.freecodecamp.org/learn/coding-interview-prep)
> - [freeCodeCamp 49-Hour DSA Course (YouTube)](https://www.youtube.com/watch?v=...)
> - [Tech Interview Handbook](https://techinterviewhandbook.org)
> - [LeetCode](https://leetcode.com)
> - Cracking the Coding Interview — Gayle Laakmann McDowell

---

*Good luck! Remember: interviews are a skill. The more you practice, the better you get. 🚀*