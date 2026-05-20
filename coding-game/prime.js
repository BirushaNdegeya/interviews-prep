function findPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return true;
  }
  return false;
}
let o = "";
for (let i = 0; i <= 18; i++) {
  if (findPrime(i)) {
    o += i.toString().repeat(i);
    // console.log(i);
  }
}
console.log(o);
