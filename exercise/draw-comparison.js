const n = 2;
let s = "R"
for (let i = 1; i <= n; i++) {
  console.log(" ".repeat(n - i) + s);
}
for (let i = 1; i < n; i++) {
  console.log(" ".repeat(i) + s);
}