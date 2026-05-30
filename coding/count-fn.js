const ref = { "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine' }
function countFn(n) {
  let count = 1;
  let o = "";
  for (let i = 0; i < n.length; i++) {
    const next = n[i + 1] ? n[i + 1] : ""
    if (n[i] == next) {
      count++;
    } else {
      o += `${count > "1" ? ref[count] : ""} ${ref[n[i]]}${count > "1" ? "s" : ""} `;
      count = 1;
    }
  }
  return o.trim();
}

console.log(countFn("2009"));
console.log(countFn("2024"));
console.log(countFn("00666"));
console.log(countFn("7777777333300"));
console.log(countFn("121211111"))