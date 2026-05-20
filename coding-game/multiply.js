const str = "aaad";
let p = 0;
let o = "";
while (p < str.length - 1) {
  const char = str[p].charCodeAt(0);
  const next = str[p + 1].charCodeAt(0);
  const diff = Math.abs(char - next);
  if (char == " ") {
    p++;
  } else {
    if (diff) {
      o += String.fromCharCode(char);
    } else {
      console.log(diff);
      o += " ".repeat(diff) + String.fromCharCode(char);
    }
    p++;
  }
}
console.log(o + str.slice(-1));