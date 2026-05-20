
/**
 * @param {Number} n 
 */
function factorial(n) {
  if(n==0 || n==1){
    return 1
  }
  return n*factorial(n-1)
}


console.log(factorial(0)) // .toBe(1)
console.log(factorial(1)) // .toBe(1)
console.log(factorial(2)) // .toBe(2)
console.log(factorial(4)) // .toBe(24)
console.log(factorial(7)) // .toBe(5040)
console.log(factorial(5)) // .toBe(5040)
// !n 5 -> 5 * 4, * 3 * 2 * 1