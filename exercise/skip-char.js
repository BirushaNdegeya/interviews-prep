/**
 * @param {String} str 
 */
function skikSameChar(str) {
  let o = "";
  for (let i = 0; i < str.length; i++) {
    const n = str[i + 1] ? str[i + 1] : "";
    if (str[i] == n) {
      o += str[i];
      i++;
    } else {
      o += str[i];
    }
  }
  return o;
}

console.log(skikSameChar("--4e33bv270000cx"))