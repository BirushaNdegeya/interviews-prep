/**
 * @param {Number} n1 
 * @param {Number} n2 
 */
function fraction(n1, n2) {
  for (let i = Math.min(n1, n2); i >= 2; i--) {
    if (n1 % i == 0 && n2 % i == 0) {
      return n1 / i + "/" + n2 / i;
    }
  }
  return n1 + "/" + n2;
}
console.log(fraction(9, 12));
console.log(fraction(3, 5));
console.log(fraction(14750533, 22725185));