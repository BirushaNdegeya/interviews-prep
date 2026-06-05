const n = 2;
const w = n * 2 + 1

for (let i = n; i >= 0; i--) {
  let txt = i.toString().repeat(i * 2 + 1);
  let outer = (i+1).toString().repeat(n - i);
  console.log(outer + txt + outer);
  // console.log((i + 1).toString().repeat(Math.floor((i - w)/2)) + v + (i + 1).toString().repeat(i - (i * 2 + 1) / 2));
}