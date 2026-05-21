let m = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

for (let i = 0; i < m.length; i++) {
  const row = m[i];
  if (row.includes(0)) {
    row.fill(0);
  }
}
for (const element of m) {
  console.log(element);
}