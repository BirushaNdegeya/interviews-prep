/*
isPalindrome
Instructions

Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.
*/


/**
 * Is Palindrom Recursive
 * @param {String} str 
 */
function isPalindrome(str) {
  let x = 0;
  let y = str.length - 1;
  while (x < y) {
    if (str[x] !== str[y]) {
      return false;
    }
    x++;
    y--
  }
  return true;
}
console.log(isPalindrome('awesome')) // toEqual(false)
console.log(isPalindrome('foobar')) // toEqual(false)
console.log(isPalindrome('tacocat')) // toEqual(true)
console.log(isPalindrome('amanaplanacanalpanama')) // toEqual(true)
console.log(isPalindrome('amanaplanacanalpandemonium')) // toEqual(false)


console.log("hello".slice(0,-1));