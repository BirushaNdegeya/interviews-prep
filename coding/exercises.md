```js
const text = readline().split('');
const codes = [];
for (let i = 97; i <= 122; i++) {
  codes.push(i);
}
let o = "";
for (let i = 0; i < text.length; i++) {
console.log(text[i]);
console.log(text[i+1].charCodeAt(0));
  const idx = codes.indexOf(text[i].charCodeAt(0));
  const nIdx = codes.indexOf(text[i+1].charCodeAt(0));

  console.log(idx, nIdx);
  // if (charCode !== nextCode) {
  //   o += charCode + ' '.repeat(Math.abs(nextCode - charCode));
  // }
}

console.log(o)


// console.log(String.fromCharCode("a"));
// console.log("z".charCodeAt(0))
```

simpler


```js

const text = readline().split('');
let o = "";

for (let i = 0; i < text.length; i++) {
  o += text[i];
  
  if (i < text.length - 1) {
    const curr = text[i].charCodeAt(0);
    const next = text[i + 1].charCodeAt(0);
    const distance = Math.abs(next - curr);
    o += ' '.repeat(distance);
  }
}

console.log(o);
```

```js
const zreb = parseInt(readline());

// Going up: 1 to n
for (let i = 1; i <= zreb; i++) {
  console.log(Array(i).fill('*').join(' '));
}
e
// Going down: n-1 to 1
for (let i = zreb - 1; i >= 1; i--) {
  console.log(Array(i).fill('*').join(' '));
}

```


```js
const s = readline();
let o = "";
let p = 0; // counts non-space characters

for (let i = 0; i < s.length; i++) {
  if (s[i] === " ") {
    o += " ";
  } else {
    o += p % 2 === 0 ? s[i].toLowerCase() : s[i].toUpperCase();
    p++;
  }
}

console.log(o);

```


```js
const q = readline().split(' ');

const subject = q[1]; // e.g. "doubt" or "value"
const lastWord = q[q.length - 1].replace("?", ""); // remove "?"

// Insert subject into the middle of lastWord
const mid = Math.floor(lastWord.length / 2);
const merged = lastWord.slice(0, mid) + subject + lastWord.slice(mid);

console.log(`Yes, ${subject} is in the ${merged}.`);
```


```js
function longestSubstring(s) {
    let acc = "";
    let max = -Infinity;
    for (let i = 0; i < s.length; i++) {
        const item = s[i];
        if (acc.search(item) == -1) {
            acc += item;
        } else {
            max = Math.max(max, acc.length);
            acc = ""
            acc += item
        }
    }
    max = Math.max(acc.length, max);
    return max;
}
console.log(longestSubstring("abcabcbb"));
console.log(longestSubstring("tmmzuxt"));
console.log(longestSubstring("aab"));
// 3
```

```js

function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = Math.floor(arr.length / 2);
}


function twoSum(nums, target) {
  let x = 0;
  let y = nums.length - 1;
  while(x <= y) {
      const sum = nums[x] + nums[y];
      if (sum === target) {
          return [x, y];
      } else if (sum > target) {
          y--;
      } else {
          x++;
      }
  }
return null;
}

console.log(twoSum([2,7,11,15, 20], 9));
// [0,1]

```



```js


/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline());

// Step 1: Find all primes up to n using a simple method
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Step 2: Build the output string
let result = '';

for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
        result += String(i).repeat(i); // repeat the digit i, exactly i times
    }
}

console.log(result);
```