let m = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];
const ref = { "x": new Set(), "y": new Set() };
for (let i = 0; i < m.length; i++) {
  for (let j = 0; j < m[i].length; j++) {
    const char = m[i][j];
    if (char == 0) {
      ref.x.add(i);
      ref.y.add(j);
    }
  }
}
for (let i = 0; i < m.length; i++) {
  for (let j = 0; j < m[i].length; j++) {
    if (ref.x.has(i) || ref.y.has(j)) {
      m[i][j] = 0;
    }
  }
}
for (const value of m) {
  console.log(value);
}
// console.log(m);