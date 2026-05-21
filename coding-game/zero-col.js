let m = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];
const idxRef = { y: new Set() }
for (let i = 0; i < m.length; i++) {
  const idx = m[i].indexOf(0);
  if (idx !== -1) {
    idxRef.y.add(idx);
  }
}
for (let i = 0; i < m.length; i++) {
  for (let j = 0; j < m[i].length; j++) {
    if (idxRef.y.has(j)) {
      m[i][j] = 0;
    }
  }
}

for (const element of m) {
  console.log(element);
}