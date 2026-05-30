function multiple(n) {
  let o = ""
  for (let i = 2; i <= Math.sqrt(n)*2; i++) {
    if (n % i == 0) {
      o += " " + i;
    }
  }
  if (o.length == 0) {
    return n;
  }
  return o.trim();
}

console.log(multiple(1643)); // 31 53
console.log(multiple(5623)); // 5623
console.log(multiple(54321)); // 3 19 953