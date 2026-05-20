/*
Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci sequence. Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.
*/

/**
 * Fib Algo
 * @param {Number} n 
 */
function fib(n) {
  let a = 1
  let b = 1
  let temp;

  for (let i = a; i < n-1;i++) {
    temp = a + b
    a = b
    b = temp
    //console.log(a+b);
  }
  return b
}


console.log(fib(4)) // toEqual(3)
console.log(fib(10)) // toEqual(55)
 console.log(fib(28)) // toEqual(317811)
 console.log(fib(35)) // toEqual(9227465)