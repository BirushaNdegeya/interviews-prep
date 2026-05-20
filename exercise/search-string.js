/**
 * Search String Algo
 * @param {String} str 
 * @param {String} match 
 */
function searchString(str, match) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < match.length; j++) {
      if (match[j] === str[i]) {
        console.log(str[i], str[j]);
      } else {
        break;
      }
    }
  }
}

console.log(searchString("hello worlod", "lo"))