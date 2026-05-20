# Working with Dates and Time in JavaScript
### A practical guide from the Clash of Code challenge

---

## Chapter 1 — Time as a number (seconds)

The key insight: **convert everything to seconds**, do arithmetic, then convert back.

```js
// Convert HH:MM:SS → total seconds
const toSec = (h, m, s) => h * 3600 + m * 60 + s;

toSec(1, 0, 0)    // → 3600
toSec(23, 59, 59) // → 86399
toSec(24, 0, 0)   // → 86400  (full day)
```

```js
// Convert total seconds → HH:MM:SS
const fromSec = (total) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s];
};
```

> **Key fact:** There are 86 400 seconds in a day (24 × 60 × 60).

---

## Chapter 2 — Zero-padding with `padStart`

Time strings always need two digits. `padStart` adds a leading zero when needed.

```js
const pad = n => String(n).padStart(2, '0');

pad(0)  // → "00"
pad(5)  // → "05"
pad(23) // → "23"   ← already 2 digits, unchanged

// Format a full time string:
const fmt = (h, m, s) => `${pad(h)}:${pad(m)}:${pad(s)}`;
fmt(1, 2, 5) // → "01:02:05"
```

---

## Chapter 3 — The modulo `%` operator

`%` returns the remainder after division. Essential for pulling minutes and seconds out of a total.

```js
3661 % 3600  // → 61   (strip hours → leftover seconds)
61   % 60    // → 1    (strip minutes → pure seconds)

// Decode 3661 seconds:
Math.floor(3661 / 3600)       // → 1   (hour)
Math.floor((3661 % 3600) / 60) // → 1   (minute)
3661 % 60                      // → 1   (second)
// Result: 01:01:01
```

---

## Chapter 4 — The Challenge Solution

**Rule:** `86400 − input_seconds = remaining seconds`, then format.

```js
const [h, min, sec] = readline().split(':').map(Number);

const total     = h * 3600 + min * 60 + sec;
const remaining = 86400 - total;

const rh = Math.floor(remaining / 3600);
const rm = Math.floor((remaining % 3600) / 60);
const rs = remaining % 60;

const pad = n => String(n).padStart(2, '0');
console.log(`${pad(rh)}:${pad(rm)}:${pad(rs)}`);
```

### Test cases

| Input      | Total seconds | 86400 − total | Output     |
|------------|--------------|--------------|------------|
| `23:59:59` | 86 399       | 1            | `00:00:01` |
| `22:57:55` | 82 675       | 3 725        | `01:02:05` |

---

## Bonus — JavaScript's `Date` object

```js
const now = new Date();

now.getHours()    // 0–23
now.getMinutes()  // 0–59
now.getSeconds()  // 0–59
now.getDay()      // 0 = Sunday … 6 = Saturday
now.getMonth()    // 0–11  ← add 1 for the human month!
now.getFullYear() // e.g. 2026

// Time until midnight using Date:
const midnight = new Date();
midnight.setHours(24, 0, 0, 0);       // next midnight
const msLeft  = midnight - now;        // difference in milliseconds
const secLeft = Math.floor(msLeft / 1000);
```

> **Gotcha:** `getMonth()` returns 0 for January, 11 for December. Always add 1 when displaying it to a user.

---

## Quick reference

| Task | Code |
|------|------|
| Time → seconds | `h * 3600 + m * 60 + s` |
| Seconds → hours | `Math.floor(t / 3600)` |
| Seconds → minutes | `Math.floor((t % 3600) / 60)` |
| Seconds → seconds | `t % 60` |
| Zero-pad a number | `String(n).padStart(2, '0')` |
| Seconds in a day | `86400` |
| Parse a time string | `"HH:MM:SS".split(':').map(Number)` |


```js

const [h, min, sec] = readline().split(':').map(Number);

const totalSeconds = h * 3600 + min * 60 + sec;
const remaining = 86400 - totalSeconds; // 86400 = 24 * 60 * 60

const rh = Math.floor(remaining / 3600);
const rm = Math.floor((remaining % 3600) / 60);
const rs = remaining % 60;

const pad = n => String(n).padStart(2, '0');
console.log(`${pad(rh)}:${pad(rm)}:${pad(rs)}`);

```