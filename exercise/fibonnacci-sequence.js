function fibonnacciSequence(n) {
  let a = 1;
  let b = 1;
 if (a==n-1) return a
  return fibonnacciSequence(a)+fibonnacciSequence(b);
}


console.log(fibonnacciSequence(4)) // give the sequence