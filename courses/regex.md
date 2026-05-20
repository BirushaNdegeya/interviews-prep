# 🔍 JavaScript Regular Expressions — Beginner to Master Course

- (https://regexr.com/)[https://regexr.com/]

> **Goal:** Go from "what is regex?" to writing complex patterns that solve real TestDome and interview challenges with confidence.

---

## 📚 Table of Contents

1. [What is a Regular Expression?](#1-what-is-a-regular-expression)
2. [Creating Regex in JavaScript](#2-creating-regex-in-javascript)
3. [Basic Characters & Literals](#3-basic-characters--literals)
4. [Character Classes](#4-character-classes)
5. [Quantifiers](#5-quantifiers)
6. [Anchors](#6-anchors)
7. [Groups & Alternation](#7-groups--alternation)
8. [Flags (Modifiers)](#8-flags-modifiers)
9. [JavaScript Regex Methods](#9-javascript-regex-methods)
10. [Special Sequences (Shorthands)](#10-special-sequences-shorthands)
11. [Lookahead & Lookbehind](#11-lookahead--lookbehind)
12. [Capturing Groups & References](#12-capturing-groups--references)
13. [Named Groups](#13-named-groups)
14. [Real-World Patterns](#14-real-world-patterns)
15. [Advanced Techniques](#15-advanced-techniques)
16. [Practice Problems (Solved)](#16-practice-problems-solved)
17. [TestDome-Style Challenges](#17-testdome-style-challenges)
18. [Cheat Sheet](#18-cheat-sheet)

---

## 1. What is a Regular Expression?

A **regular expression** (regex) is a pattern used to search, match, or manipulate text.

Think of it as a **super-powered search** that goes beyond simple "find this word" — it can find:
- Any email address
- Any phone number
- Any word that starts with a capital letter
- Any string that contains exactly 3 digits

### Real-life analogy

Imagine you have thousands of forms and you want to find every one that has an invalid email. Instead of checking each one manually, you write a regex pattern — and it scans all of them in milliseconds.

```javascript
// Does this string look like an email?
let pattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
console.log(pattern.test("user@example.com")); // true
console.log(pattern.test("not-an-email"));      // false
```

---

## 2. Creating Regex in JavaScript

There are **two ways** to create a regex:

### Method 1: Literal syntax (most common)

```javascript
let regex = /hello/;
//          ^ ^
//     start   end — the pattern goes between the slashes
```

### Method 2: RegExp constructor

```javascript
let regex = new RegExp("hello");

// Use this when the pattern is dynamic (built from a variable):
let word = "hello";
let regex2 = new RegExp(word);
```

> ⚠️ In the `RegExp` constructor, backslashes must be **doubled** because the string itself also uses backslashes:

```javascript
// Literal:
let r1 = /\d+/;

// Constructor (escape the backslash):
let r2 = new RegExp("\\d+");
```

---

## 3. Basic Characters & Literals

The simplest regex just matches the exact characters you type.

```javascript
let regex = /cat/;

console.log(regex.test("I have a cat"));    // true
console.log(regex.test("concatenate"));     // true  (contains "cat")
console.log(regex.test("dog"));             // false
```

### Special characters (metacharacters)

These characters have **special meaning** in regex. To match them literally, escape with `\`:

```
.  *  +  ?  ^  $  {  }  [  ]  |  (  )  \
```

```javascript
// Match a literal dot (period)
let regex = /3\.14/;
console.log(regex.test("3.14")); // true
console.log(regex.test("3x14")); // false (. is escaped, so it's literal)
```

### The dot `.` — match ANY character

```javascript
let regex = /h.t/;
console.log(regex.test("hat")); // true
console.log(regex.test("hit")); // true
console.log(regex.test("hot")); // true
console.log(regex.test("ht"));  // false (needs exactly one char in middle)
```

---

## 4. Character Classes

A **character class** `[...]` matches **one character** from a set of options.

```javascript
let regex = /[aeiou]/;  // match any single vowel
console.log(regex.test("hello")); // true  (contains 'e' and 'o')
console.log(regex.test("rhythm")); // false (no vowels)
```

### Ranges inside character classes

```javascript
let lowercase = /[a-z]/;   // any lowercase letter
let uppercase = /[A-Z]/;   // any uppercase letter
let digit     = /[0-9]/;   // any digit
let alphanum  = /[a-zA-Z0-9]/; // any letter or digit
```

### Negated character class `[^...]`

The `^` inside `[...]` means **NOT**:

```javascript
let noVowel = /[^aeiou]/;  // any character that is NOT a vowel
console.log(noVowel.test("sky")); // true  ('s', 'k', 'y' are not vowels)
console.log(noVowel.test("aei")); // false (all are vowels)
```

### Examples

```javascript
/[a-f]/     // matches a, b, c, d, e, or f
/[^0-9]/    // matches anything that is NOT a digit
/[A-Za-z]/  // matches any letter (upper or lower)
/[.,;!?]/   // matches punctuation
```

---

## 5. Quantifiers

Quantifiers control **how many times** a character or group must appear.

### The basics

| Quantifier | Meaning | Example |
|---|---|---|
| `?` | 0 or 1 (optional) | `colou?r` → "color" or "colour" |
| `*` | 0 or more | `ab*c` → "ac", "abc", "abbc" |
| `+` | 1 or more | `ab+c` → "abc", "abbc" (NOT "ac") |
| `{n}` | Exactly n times | `\d{4}` → exactly 4 digits |
| `{n,}` | n or more times | `\d{2,}` → 2 or more digits |
| `{n,m}` | Between n and m times | `\d{2,4}` → 2 to 4 digits |

```javascript
// Optional 's' at the end
let regex = /cats?/;
console.log(regex.test("cat"));  // true
console.log(regex.test("cats")); // true

// One or more digits
let digits = /\d+/;
console.log(digits.test("abc123")); // true
console.log(digits.test("abc"));    // false

// Exactly 4 digits
let fourDigits = /^\d{4}$/;
console.log(fourDigits.test("1234"));  // true
console.log(fourDigits.test("12345")); // false
```

### Greedy vs Lazy

By default, quantifiers are **greedy** — they match as much as possible.
Add `?` after a quantifier to make it **lazy** — match as little as possible.

```javascript
let str = "<b>bold</b> and <i>italic</i>";

// Greedy: matches from first < to LAST >
let greedy = /<.+>/;
console.log(str.match(greedy)[0]); // "<b>bold</b> and <i>italic</i>"

// Lazy: matches the SHORTEST possible
let lazy = /<.+?>/;
console.log(str.match(lazy)[0]); // "<b>"
```

---

## 6. Anchors

Anchors don't match characters — they match **positions** in the string.

### `^` — Start of string

```javascript
let regex = /^Hello/;
console.log(regex.test("Hello world")); // true  (starts with Hello)
console.log(regex.test("Say Hello"));   // false (Hello is not at start)
```

### `$` — End of string

```javascript
let regex = /world$/;
console.log(regex.test("Hello world")); // true  (ends with world)
console.log(regex.test("world peace")); // false (world is not at end)
```

### Combining `^` and `$` — Match the WHOLE string

This is very common in validation:

```javascript
// Must be exactly 3 digits, nothing else
let regex = /^\d{3}$/;
console.log(regex.test("123"));      // true
console.log(regex.test("1234"));     // false (too long)
console.log(regex.test("12a"));      // false (has a letter)
console.log(regex.test("  123  "));  // false (has spaces)
```

### `\b` — Word boundary

Matches the position **between** a word character and a non-word character.

```javascript
let regex = /\bcat\b/;
console.log(regex.test("the cat sat"));  // true  (cat is a whole word)
console.log(regex.test("concatenate"));  // false (cat is inside a word)
console.log(regex.test("cat-like"));     // true  (cat is at a boundary)
```

---

## 7. Groups & Alternation

### Grouping with `()`

Parentheses group parts of a pattern together, letting you apply quantifiers to the whole group:

```javascript
// "ab" repeated one or more times
let regex = /(ab)+/;
console.log(regex.test("ab"));     // true
console.log(regex.test("ababab")); // true
console.log(regex.test("a"));      // false
```

### Alternation with `|` (OR)

```javascript
let regex = /cat|dog|bird/;
console.log(regex.test("I have a cat")); // true
console.log(regex.test("I have a dog")); // true
console.log(regex.test("I have a fish")); // false
```

### Combining groups and alternation

```javascript
// Match "grey" or "gray"
let regex = /gr(e|a)y/;
// Or more concisely:
let regex2 = /gr[ea]y/;

console.log(regex.test("grey")); // true
console.log(regex.test("gray")); // true
```

---

## 8. Flags (Modifiers)

Flags come **after** the closing `/` and change how the regex behaves.

### `i` — Case insensitive

```javascript
let regex = /hello/i;
console.log(regex.test("Hello"));   // true
console.log(regex.test("HELLO"));   // true
console.log(regex.test("hElLo"));   // true
```

### `g` — Global (find ALL matches, not just the first)

```javascript
let str = "cat bat sat";
let matches = str.match(/[a-z]at/g);
console.log(matches); // ["cat", "bat", "sat"]

// Without g, only the first match is returned:
let firstOnly = str.match(/[a-z]at/);
console.log(firstOnly[0]); // "cat"
```

### `m` — Multiline (`^` and `$` match each line)

```javascript
let text = "first line\nsecond line\nthird line";

// Without m: ^ only matches start of whole string
console.log(/^second/.test(text)); // false

// With m: ^ matches start of each line
console.log(/^second/m.test(text)); // true
```

### `s` — Dotall (`.` also matches newline `\n`)

```javascript
let text = "line1\nline2";

// Without s: dot does NOT match \n
console.log(/line1.line2/.test(text)); // false

// With s: dot matches everything including \n
console.log(/line1.line2/s.test(text)); // true
```

### Combining flags

```javascript
let regex = /hello/gi;  // global + case-insensitive
let str = "Hello hello HELLO";
console.log(str.match(regex)); // ["Hello", "hello", "HELLO"]
```

---

## 9. JavaScript Regex Methods

### `regex.test(string)` — Returns `true` or `false`

```javascript
let regex = /\d+/;
console.log(regex.test("abc123")); // true
console.log(regex.test("abc"));    // false
```

### `string.match(regex)` — Returns match(es) or `null`

```javascript
let str = "The price is $42 and $100";

// Without g: returns first match + details
let first = str.match(/\$\d+/);
console.log(first[0]); // "$42"

// With g: returns all matches as array
let all = str.match(/\$\d+/g);
console.log(all); // ["$42", "$100"]
```

### `string.matchAll(regex)` — Returns iterator of all matches (with groups)

```javascript
let str = "2024-01-15 and 2024-03-22";
let regex = /(\d{4})-(\d{2})-(\d{2})/g;

for (let match of str.matchAll(regex)) {
  console.log(match[0]); // full match
  console.log(match[1]); // year
  console.log(match[2]); // month
  console.log(match[3]); // day
}
```

### `string.search(regex)` — Returns index of first match or `-1`

```javascript
let str = "Hello World";
console.log(str.search(/World/)); // 6
console.log(str.search(/xyz/));   // -1
```

### `string.replace(regex, replacement)` — Replace match(es)

```javascript
let str = "Hello World";

// Replace first match
console.log(str.replace(/o/, "0")); // "Hell0 World"

// Replace all matches (use g flag)
console.log(str.replace(/o/g, "0")); // "Hell0 W0rld"
```

### `string.replace()` with a function

```javascript
let str = "hello world";

// Capitalize first letter of each word
let result = str.replace(/\b\w/g, char => char.toUpperCase());
console.log(result); // "Hello World"
```

### `string.replaceAll(string, replacement)` — Replace all (simpler for plain strings)

```javascript
let str = "cat and cat and cat";
console.log(str.replaceAll("cat", "dog")); // "dog and dog and dog"
```

### `string.split(regex)` — Split by pattern

```javascript
let str = "one1two2three3four";

// Split on any digit
let parts = str.split(/\d/);
console.log(parts); // ["one", "two", "three", "four"]
```

---

## 10. Special Sequences (Shorthands)

These are shorthand notations for common character classes:

| Shorthand | Meaning | Equivalent |
|---|---|---|
| `\d` | Any digit | `[0-9]` |
| `\D` | Any NON-digit | `[^0-9]` |
| `\w` | Word character | `[a-zA-Z0-9_]` |
| `\W` | NON-word character | `[^a-zA-Z0-9_]` |
| `\s` | Whitespace | `[ \t\n\r\f\v]` |
| `\S` | NON-whitespace | `[^ \t\n\r\f\v]` |
| `\b` | Word boundary | (position) |
| `\B` | Non-word boundary | (position) |
| `\n` | Newline | — |
| `\t` | Tab | — |

```javascript
// \d — match digits
console.log("Price: 42".match(/\d+/)[0]); // "42"

// \w — match word characters
console.log("hello_123!".match(/\w+/)[0]); // "hello_123"

// \s — match whitespace
console.log("hello   world".replace(/\s+/g, " ")); // "hello world"

// \D — match non-digits
console.log("a1b2c3".replace(/\D/g, "")); // "123" (keep only digits)
```

---

## 11. Lookahead & Lookbehind

These are **zero-width assertions** — they look ahead or behind without consuming characters.

### Positive Lookahead `(?=...)`

"Match X **only if followed by** Y"

```javascript
// Match a number only if followed by " dollars"
let regex = /\d+(?= dollars)/;
let str = "I have 50 dollars and 30 euros";
console.log(str.match(regex)[0]); // "50"
```

### Negative Lookahead `(?!...)`

"Match X **only if NOT followed by** Y"

```javascript
// Match "cat" only if NOT followed by "fish"
let regex = /cat(?!fish)/;
console.log(regex.test("cat"));     // true
console.log(regex.test("catfish")); // false
```

### Positive Lookbehind `(?<=...)`

"Match X **only if preceded by** Y"

```javascript
// Match a number only if preceded by "$"
let regex = /(?<=\$)\d+/;
let str = "Price: $42, tax: 5";
console.log(str.match(regex)[0]); // "42"  (not "5")
```

### Negative Lookbehind `(?<!...)`

"Match X **only if NOT preceded by** Y"

```javascript
// Match a number NOT preceded by "$"
let regex = /(?<!\$)\d+/;
let str = "Price: $42, count: 5";
console.log(str.match(regex)[0]); // "5"
```

---

## 12. Capturing Groups & References

### Capturing Groups `()`

When you wrap a pattern in `()`, the matched text is **captured** and can be referenced.

```javascript
let regex = /(\d{4})-(\d{2})-(\d{2})/;
let match = "2024-03-15".match(regex);

console.log(match[0]); // "2024-03-15" — full match
console.log(match[1]); // "2024"        — group 1
console.log(match[2]); // "03"          — group 2
console.log(match[3]); // "15"          — group 3
```

### Backreferences `\1`, `\2`, etc.

Reference a previously captured group **within the same pattern**:

```javascript
// Match a repeated word (like "the the")
let regex = /\b(\w+)\s+\1\b/;
console.log(regex.test("the the"));     // true
console.log(regex.test("hello hello")); // true
console.log(regex.test("hello world")); // false
```

### Backreferences in replacement `$1`, `$2`, etc.

```javascript
// Swap first and last name
let name = "Doe, John";
let result = name.replace(/(\w+), (\w+)/, "$2 $1");
console.log(result); // "John Doe"

// Reformat date from MM/DD/YYYY to YYYY-MM-DD
let date = "03/15/2024";
let formatted = date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
console.log(formatted); // "2024-03-15"
```

### Non-Capturing Groups `(?:...)`

Group without capturing — use when you need grouping but don't need the value:

```javascript
// Group "ab" for quantifier, but don't capture it
let regex = /(?:ab)+/;
let match = "ababab".match(regex);
console.log(match[0]); // "ababab"
console.log(match[1]); // undefined — no capture!
```

---

## 13. Named Groups

Named groups make your regex much more readable.

```javascript
// Without named groups:
let r1 = /(\d{4})-(\d{2})-(\d{2})/;
let m1 = "2024-03-15".match(r1);
console.log(m1[1]); // year? month? you have to count!

// With named groups (?<name>...):
let r2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let m2 = "2024-03-15".match(r2);
console.log(m2.groups.year);  // "2024"
console.log(m2.groups.month); // "03"
console.log(m2.groups.day);   // "15"
```

### Named groups in replacement

```javascript
let date = "2024-03-15";
let regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

let us = date.replace(regex, "$<month>/$<day>/$<year>");
console.log(us); // "03/15/2024"
```

---

## 14. Real-World Patterns

### Email validation

```javascript
let email = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;

console.log(email.test("user@example.com"));      // true
console.log(email.test("user.name+tag@sub.co"));  // true
console.log(email.test("missing@domain"));         // false
console.log(email.test("@nodomain.com"));          // false
```

### URL validation

```javascript
let url = /^https?:\/\/[\w-]+(\.[\w-]+)+(\/[\w\-./?%&=]*)?$/;

console.log(url.test("https://example.com"));        // true
console.log(url.test("http://sub.domain.org/page")); // true
console.log(url.test("ftp://wrong-protocol.com"));   // false
```

### Phone number (various formats)

```javascript
// Matches: (123) 456-7890, 123-456-7890, 1234567890
let phone = /^(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

console.log(phone.test("(123) 456-7890")); // true
console.log(phone.test("123-456-7890"));   // true
console.log(phone.test("1234567890"));     // true
console.log(phone.test("12345"));          // false
```

### Strong password validation

```javascript
// At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
function isStrongPassword(password) {
  return (
    /^.{8,}$/.test(password) &&        // at least 8 chars
    /[A-Z]/.test(password) &&           // has uppercase
    /[a-z]/.test(password) &&           // has lowercase
    /\d/.test(password) &&              // has digit
    /[!@#$%^&*(),.?":{}|<>]/.test(password) // has special char
  );
}

console.log(isStrongPassword("Password1!"));  // true
console.log(isStrongPassword("password1!"));  // false (no uppercase)
console.log(isStrongPassword("Pass!"));        // false (too short)
```

### Credit card number (basic)

```javascript
// Groups of 4 digits separated by spaces or dashes
let card = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/;

console.log(card.test("1234 5678 9012 3456")); // true
console.log(card.test("1234-5678-9012-3456")); // true
console.log(card.test("1234567890123456"));     // true
console.log(card.test("1234 5678 9012"));       // false
```

### IPv4 address

```javascript
let ip = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

console.log(ip.test("192.168.1.1"));  // true
console.log(ip.test("255.255.255.0")); // true
console.log(ip.test("999.1.1.1"));    // false
console.log(ip.test("192.168.1"));    // false
```

### Hex color code

```javascript
let hex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

console.log(hex.test("#ff5733")); // true
console.log(hex.test("#FFF"));    // true
console.log(hex.test("#GGG"));    // false
console.log(hex.test("ff5733"));  // false (missing #)
```

### Postal code / ZIP code

```javascript
let usZip = /^\d{5}(-\d{4})?$/;  // US: 12345 or 12345-6789
console.log(usZip.test("12345"));      // true
console.log(usZip.test("12345-6789")); // true
console.log(usZip.test("1234"));       // false
```

### Username rules

```javascript
// 3-20 chars, letters/digits/underscores, must start with a letter
let username = /^[a-zA-Z]\w{2,19}$/;

console.log(username.test("john_doe"));  // true
console.log(username.test("j"));         // false (too short)
console.log(username.test("1username")); // false (starts with digit)
```

---

## 15. Advanced Techniques

### 15.1 Extract all matches with groups

```javascript
let html = '<a href="https://google.com">Google</a><a href="https://github.com">GitHub</a>';
let regex = /href="([^"]+)"/g;
let links = [];

for (let match of html.matchAll(regex)) {
  links.push(match[1]); // group 1 = the URL
}
console.log(links); // ["https://google.com", "https://github.com"]
```

### 15.2 Dynamic regex from user input

```javascript
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function searchText(text, query) {
  let safeQuery = escapeRegex(query);
  let regex = new RegExp(safeQuery, "gi");
  return text.match(regex) || [];
}

console.log(searchText("Hello world! Hello?", "hello")); // ["Hello", "Hello"]
console.log(searchText("1 + 1 = 2", "1 + 1")); // ["1 + 1"] (not broken by special chars)
```

### 15.3 Trim whitespace (regex vs built-in)

```javascript
let str = "  hello world  ";

// Using regex
console.log(str.replace(/^\s+|\s+$/g, "")); // "hello world"

// Built-in (prefer this in practice)
console.log(str.trim()); // "hello world"

// Trim only left or right
console.log(str.replace(/^\s+/, "")); // "hello world  "
console.log(str.replace(/\s+$/, "")); // "  hello world"
```

### 15.4 Remove duplicate words

```javascript
let str = "the the quick brown fox fox";
let result = str.replace(/\b(\w+)\s+\1\b/gi, "$1");
console.log(result); // "the quick brown fox"
```

### 15.5 Validate and parse in one step

```javascript
function parseDate(str) {
  let regex = /^(?<year>\d{4})-(?<month>0[1-9]|1[0-2])-(?<day>0[1-9]|[12]\d|3[01])$/;
  let match = str.match(regex);
  if (!match) return null;
  return match.groups; // { year, month, day }
}

console.log(parseDate("2024-03-15")); // { year: '2024', month: '03', day: '15' }
console.log(parseDate("2024-13-01")); // null (month 13 is invalid)
console.log(parseDate("not-a-date")); // null
```

### 15.6 Count occurrences

```javascript
function countOccurrences(text, pattern) {
  return (text.match(new RegExp(pattern, "g")) || []).length;
}

console.log(countOccurrences("banana", "a"));   // 3
console.log(countOccurrences("hello world", "\\bw\\w+")); // 1  (world)
```

### 15.7 Replace with computed value

```javascript
// Double every number in a string
let str = "I have 3 cats and 5 dogs";
let result = str.replace(/\d+/g, n => n * 2);
console.log(result); // "I have 6 cats and 10 dogs"
```

---

## 16. Practice Problems (Solved)

### Problem 1: Check if string is a valid integer

```javascript
function isValidInteger(str) {
  return /^-?\d+$/.test(str.trim());
}

console.log(isValidInteger("123"));   // true
console.log(isValidInteger("-42"));   // true
console.log(isValidInteger("3.14"));  // false (decimal)
console.log(isValidInteger("12a"));   // false (letter)
console.log(isValidInteger("  7 ")); // true  (trimmed)
```

### Problem 2: Extract all numbers from a string

```javascript
function extractNumbers(str) {
  return str.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
}

console.log(extractNumbers("I have 3 cats, 12.5 fish, and -2 birds"));
// [3, 12.5, -2]
```

### Problem 3: Check camelCase format

```javascript
function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}

console.log(isCamelCase("camelCase"));   // true
console.log(isCamelCase("myVariable1")); // true
console.log(isCamelCase("PascalCase"));  // false (uppercase first)
console.log(isCamelCase("has space"));   // false
```

### Problem 4: Mask a credit card number

```javascript
function maskCard(card) {
  return card.replace(/\d(?=\d{4})/g, "*");
}

console.log(maskCard("1234 5678 9012 3456")); // "**** **** **** 3456"
```

### Problem 5: Parse query string

```javascript
function parseQueryString(url) {
  let result = {};
  let regex = /[?&]([^=&]+)=([^&]*)/g;
  for (let match of url.matchAll(regex)) {
    result[match[1]] = decodeURIComponent(match[2]);
  }
  return result;
}

let url = "https://example.com?name=John&age=30&city=New%20York";
console.log(parseQueryString(url));
// { name: 'John', age: '30', city: 'New York' }
```

### Problem 6: Convert snake_case to camelCase

```javascript
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

console.log(snakeToCamel("hello_world"));        // "helloWorld"
console.log(snakeToCamel("my_variable_name"));   // "myVariableName"
```

### Problem 7: Validate password strength (detailed feedback)

```javascript
function checkPassword(password) {
  let errors = [];
  if (!/^.{8,}$/.test(password))    errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password))       errors.push("At least one uppercase letter");
  if (!/[a-z]/.test(password))       errors.push("At least one lowercase letter");
  if (!/\d/.test(password))          errors.push("At least one digit");
  if (!/[^a-zA-Z0-9]/.test(password)) errors.push("At least one special character");
  return errors.length === 0 ? "Strong!" : errors;
}

console.log(checkPassword("Pass1!"));     // ["At least 8 characters"]
console.log(checkPassword("Password1!")); // "Strong!"
```

---

## 17. TestDome-Style Challenges

### 🧩 Challenge 1: Validate a Username

**Rules:** 4–20 characters, only letters, digits, underscores. Must start with a letter.

```javascript
// Try it yourself first!
```

<details>
<summary>✅ Solution</summary>

```javascript
function isValidUsername(username) {
  return /^[a-zA-Z]\w{3,19}$/.test(username);
}
// \w = [a-zA-Z0-9_], so {3,19} after the first letter = 4 to 20 total

console.log(isValidUsername("john_doe"));    // true
console.log(isValidUsername("a1b2c3"));      // true
console.log(isValidUsername("abc"));         // false (too short)
console.log(isValidUsername("1username"));   // false (starts with digit)
console.log(isValidUsername("has space"));   // false (space not allowed)
```

</details>

---

### 🧩 Challenge 2: Find Repeated Words

Write a function that returns all words that appear more than once in a string.

```javascript
// Try it yourself!
```

<details>
<summary>✅ Solution</summary>

```javascript
function findRepeatedWords(text) {
  let words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let count = {};
  for (let word of words) {
    count[word] = (count[word] || 0) + 1;
  }
  return Object.keys(count).filter(w => count[w] > 1);
}

console.log(findRepeatedWords("the cat sat on the mat and the cat"));
// ["the", "cat"]
```

</details>

---

### 🧩 Challenge 3: Validate IP Address

Write a function that returns `true` only for valid IPv4 addresses.

```javascript
// Try it yourself!
```

<details>
<summary>✅ Solution</summary>

```javascript
function isValidIP(ip) {
  // Each octet: 0-255
  let octet = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;
  let parts = ip.split(".");
  return parts.length === 4 && parts.every(p => octet.test(p));
}

console.log(isValidIP("192.168.1.1"));    // true
console.log(isValidIP("255.255.255.255")); // true
console.log(isValidIP("256.1.1.1"));      // false (256 > 255)
console.log(isValidIP("192.168.1"));      // false (only 3 parts)
console.log(isValidIP("1.2.3.abc"));      // false (not a number)
```

</details>

---

### 🧩 Challenge 4: Count Words Starting With a Capital Letter

```javascript
// Try it yourself!
```

<details>
<summary>✅ Solution</summary>

```javascript
function countCapitalizedWords(text) {
  return (text.match(/\b[A-Z][a-z]*/g) || []).length;
}

console.log(countCapitalizedWords("Hello World from JavaScript")); // 3
console.log(countCapitalizedWords("all lowercase here"));          // 0
console.log(countCapitalizedWords("NASA and the FBI are agencies")); // 4
```

</details>

---

### 🧩 Challenge 5: Replace Profanity Filter (censoring words)

Given a list of banned words, replace them with asterisks of the same length.

```javascript
// Try it yourself!
```

<details>
<summary>✅ Solution</summary>

```javascript
function censorWords(text, banned) {
  let pattern = new RegExp(`\\b(${banned.map(w =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ).join("|")})\\b`, "gi");

  return text.replace(pattern, match => "*".repeat(match.length));
}

console.log(censorWords("The cat is bad and mad", ["bad", "mad"]));
// "The cat is *** and ***"
```

</details>

---

### 🧩 Challenge 6 (Hard): Extract Markdown Links

From a markdown string, extract all `[text](url)` pairs.

```javascript
// Try it yourself!
```

<details>
<summary>✅ Solution</summary>

```javascript
function extractLinks(markdown) {
  let regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let links = [];
  for (let match of markdown.matchAll(regex)) {
    links.push({ text: match[1], url: match[2] });
  }
  return links;
}

let md = "Visit [Google](https://google.com) and [GitHub](https://github.com)!";
console.log(extractLinks(md));
// [
//   { text: 'Google', url: 'https://google.com' },
//   { text: 'GitHub', url: 'https://github.com' }
// ]
```

</details>

---

## 18. Cheat Sheet

### Metacharacters

| Symbol | Meaning |
|---|---|
| `.` | Any character (except newline) |
| `\d` | Digit `[0-9]` |
| `\D` | Non-digit |
| `\w` | Word char `[a-zA-Z0-9_]` |
| `\W` | Non-word char |
| `\s` | Whitespace |
| `\S` | Non-whitespace |
| `\b` | Word boundary |
| `^` | Start of string |
| `$` | End of string |

### Quantifiers

| Quantifier | Meaning |
|---|---|
| `?` | 0 or 1 |
| `*` | 0 or more |
| `+` | 1 or more |
| `{n}` | Exactly n |
| `{n,}` | n or more |
| `{n,m}` | Between n and m |
| `*?`, `+?` | Lazy (match minimum) |

### Groups

| Syntax | Meaning |
|---|---|
| `(abc)` | Capturing group |
| `(?:abc)` | Non-capturing group |
| `(?<name>abc)` | Named group |
| `(?=abc)` | Positive lookahead |
| `(?!abc)` | Negative lookahead |
| `(?<=abc)` | Positive lookbehind |
| `(?<!abc)` | Negative lookbehind |
| `\1`, `\2` | Backreference |
| `$1`, `$2` | Replacement reference |

### Flags

| Flag | Meaning |
|---|---|
| `g` | Global (all matches) |
| `i` | Case insensitive |
| `m` | Multiline |
| `s` | Dotall (`.` matches `\n`) |

### JS Methods

| Method | Returns |
|---|---|
| `regex.test(str)` | `true` / `false` |
| `str.match(regex)` | Array or `null` |
| `str.matchAll(regex)` | Iterator of all matches |
| `str.search(regex)` | Index or `-1` |
| `str.replace(regex, rep)` | New string |
| `str.split(regex)` | Array of parts |

---

## 🎯 Learning Path Summary

Follow this order to go from beginner to master:

1. ✅ Understand literals and the dot `.`
2. ✅ Learn character classes `[...]` and negation `[^...]`
3. ✅ Master quantifiers `?` `*` `+` `{n,m}`
4. ✅ Use anchors `^` `$` `\b` for full-string matching
5. ✅ Practice groups `()` and alternation `|`
6. ✅ Learn all flags: `g`, `i`, `m`, `s`
7. ✅ Master JS methods: `test`, `match`, `replace`, `split`
8. ✅ Learn shorthand sequences `\d`, `\w`, `\s`
9. ✅ Study lookaheads and lookbehinds
10. ✅ Use named groups for readable patterns
11. ✅ Build real-world patterns (email, IP, password, URL)
12. ✅ Solve timed challenges like TestDome problems

> 💡 **Pro tip:** Test all your patterns at https://regex101.com — it shows exactly what each part matches with full explanations.

Good luck! 🚀