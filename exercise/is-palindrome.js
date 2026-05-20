
/**
 * 
 * @param {String} str 
 */
function isPalindrome(str) {
  left = 0;
  end = str.length - 1;
  while (left < end) {
    if (str[left] !== str[end]) {
      return false;
    }
    left++;
    end--;
  }
  return true;
}

//                        x     y
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("abcba"));   // true
console.log(isPalindrome("a"));       // true
console.log(isPalindrome(""));        // true