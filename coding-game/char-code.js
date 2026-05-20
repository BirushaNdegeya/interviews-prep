//         012 + 3
let str = "loremmipsumdole";
// let str = "aamd"
let o = "";
let p = 0;
while (p < str.length - 1) {
  const char = str[p].charCodeAt(0);
  const next = str[p + 1].charCodeAt(0);
  const diff = Math.abs(next - char);
  if (diff === 0) {
    o += String.fromCharCode(char);
  } else {
    o += String.fromCharCode(char) + " ".repeat(diff);
  }
  p++;
}
console.log(o + str.slice(-1));