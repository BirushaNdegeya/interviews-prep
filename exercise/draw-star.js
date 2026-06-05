const n = 5;

for (let i = 1; i <= n; i++) {
  const char = "*".repeat(i)
  console.log(char.split('').join(' '));
}
for (let i = n-1; i >= 1; i--) {
  const char = "*".repeat(i)
  console.log(char.split('').join(' '));
}