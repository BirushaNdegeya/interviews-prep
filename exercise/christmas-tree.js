const n = 4;

for (let i = 1; i <= n; i++) {
  console.log(" ".repeat(n-i) + '*'.repeat(i).split('').join(' '));
}
console.log(" ".repeat(n-1) + "|")
// console.log(n-1)