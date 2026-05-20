/**
 * 
 * @param {String} str1
 * @param { String } st2
 */

function anagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const lookup = {};

  for (let i = 0; i < str1.length; i++) {
    const letter = str1[i];
    lookup[letter] = (lookup[letter] || 0) + 1;
  }

  for (let i = 0; i < str2.length; i++) {
    letter = str2[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
}

console.log(anagram("valid", "valid"))

/*



function anagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const fSTR1 = {};
  const fSTR2 = {};
  for (let i = 0; i < str2.length; i++) {
    const letter = str2[i];
    fSTR2[letter] = (fSTR1[letter] || 0) + 1;
  }

  for (let i = 0; i < str1.length; i++) {
    const letter = str1[i];
    fSTR1[letter] = (fSTR1[letter] || 0) + 1;
  }

  for (let key in fSTR1) {
    if (fSTR1[key] !== fSTR2[key]) return false;
  }

  return true
}

console.log(anagram("valid", "alidd"))

*/