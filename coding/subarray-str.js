const str = "hello";
let out = [];
for (let i = 0; i < str.length; i++) {
  for (let j = 0; j < str.length; j++) {
    out.push(str.slice(i, j+1));
  }
}

console.log(out)