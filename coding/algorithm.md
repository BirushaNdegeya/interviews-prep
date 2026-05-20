// a proccesss to solve a task
// devise a plan for solving problems
// Master common problem solving patterns
/*
- Understand the problem
- Explore concrete examples
- Break it down
- Solve/Simplify
- Look back and refactor
*/
// George POLYA - How to solve it - books mathematics
// understand the challenge

// 1. can i restate the problem in my own words ?
// 2. Where are the inputs that go into the problem?
// 3. What are the outputs that should come from the solution to the problem?
// 4. Can the outputs be determined from the inputs? in order words
// 5. How should i label the important pieces of data that are a part of the problem ?

// Write a function which takes two numbers and return their sum?


// write a function which takes in a string and returns counts of each character in the string

/**
 *
 * @param {string} str
 * @returns {}
 */
function charCount(str) {
  const freq = {};
  if (!str) return {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    // check alphanumeric
    /*
   if (/[a-z0-9]/.test(char)) {}
    */
    if ((char >= "a" && char <= "z") || Number(char)) {
      // freq[char] = (freq[char] || 0) + 1;
      // other method
      /*
      if (freq[char] > 0) {
        freq[char] ++;
      } else {
        freq[char] = 1;
      }
      */
      //  other method
      freq[char] = ++freq[char] || 1;
    }
  }
  return freq;
}

console.log(charCount("dkd555!dkaadA "));

// regular expression
//

/**
 *
 * @param {string} char char
 * @returns boolean
 */
function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 47 && code < 58) && // upper case (AZ)
    !(code > 96 && code < 123)
  ) {
    return false;
    // lower case (aze)
  }
  return true;
}
