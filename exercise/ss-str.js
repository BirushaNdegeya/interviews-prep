function SStr(str, pat) {
  let s = "";
  let d = [];
  for (let i = 0; i < str.length; i++) {
    if (pat[i] == "e") {
      s += str[i];
    } else {
      d.push(str[i]);
    }
  }
  return d.reverse().join('') +s;
  console.log(d);
}
console.log(SStr("input", "sssss"));
console.log(SStr(" oworllledH!", "sseeesessese"));