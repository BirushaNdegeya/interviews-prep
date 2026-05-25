const str = 'hello worldZXauUSD EURD* USD-839_83';
const recap = /[A-Z]/;
const resm = /[a-z]/;
let o = "";
for (const char of str) {
  if (resm.test(char)) {
    const code = (((char.charCodeAt(0) - 97) + 1) % 26) + 97;
    o += String.fromCharCode(code);
  } else if (recap.test(char)) {
    const code = (((char.charCodeAt(0) - 65) + 1) % 26) + 65;
    o += String.fromCharCode(code);
  } else {
    o += char;
  }
}

console.log(o);