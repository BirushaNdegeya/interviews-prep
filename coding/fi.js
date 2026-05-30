const n = Math.round(Math.random() * 20);
function fib(n) {
  let a = 0;
  let b = 1;
  let o = ""+a;
  let i = 1;
  while (i < n) {
    o += " " + b;
    [a, b] = [b, a + b];
    i++;
  }
  return o;
}
console.log(fib(n));