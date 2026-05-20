const str1 = "banana";
const str2 = "ananas";
let o = "";
for (let i = 0; i < str1.length; i++) {
  const char1code = str1[i].charCodeAt(0);
  const char2code = str2[i].charCodeAt(0);
  console.log(char1code, char2code);
  const currentCode = Math.max(char1code, char2code);
  o += String.fromCharCode(currentCode);
}
console.log(o);


// 70%60
// 80%60
// 