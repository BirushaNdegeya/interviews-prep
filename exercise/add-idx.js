/**
 * Add Current Idx Algo
 * @param {String} char 
 */
function addIdx(char) {
  let o = "";
  for (let i = 0; i < char.length; i++) {
    if (/[A-Z]/.test(char[i])) {
      const xx = ((char[i].charCodeAt(0) - 65 + i) % 26) + 65;
      o += String.fromCharCode(xx);

    } else if (/[a-z]/.test(char[i])) {
      const xx = ((char[i].charCodeAt(0) - 97 + i) % 26) + 97;
      o += String.fromCharCode(xx);
    } else {
      o += char[i];
    }
  }
  return o;
}
console.log(addIdx("Hello")); // Hfnos
console.log(addIdx("Hi, how are you?")); // Hj, ltc iao kbi?