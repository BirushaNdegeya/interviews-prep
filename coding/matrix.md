```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
const tr = matrix.map((_, col) => matrix.map(row => row[col]));
console.log(tr);
```

```js
const [w, h] = readline().split(' ').map(Number);
const oc = readline(); // border character
const ic = readline(); // inside character

for (let i = 0; i < h; i++) {
    let row = "";

    for (let j = 0; j < w; j++) {
        if (i === 0  i === h - 1  j === 0 || j === w - 1) {
            row += oc; // border
        } else {
            row += ic; // inside
        }
    }

    console.log(row);
}
```

```js
/*
Before:    After:
1  2  3    7  4  1
4  5  6    8  5  2
7  8  9    9  6  3
*/
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
let row = matrix.length;
let col = matrix[0].length;
let o = Array.from({ length: col }, () => Array(row).fill(0));

for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
        o[c][row - 1 - r] = matrix[r][c]        
    }
}

for (let i = 0; i < o.length; i++) {
    console.log(o[i].join(" "))
}
```