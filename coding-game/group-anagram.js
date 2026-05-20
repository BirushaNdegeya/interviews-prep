/**
 * 
 * @param {Array} arr 
 */
function groupAnagrams(arr) {
  const acc = {};
  const o = []
  for (let char of arr) {
    const order = char.split('').sort((a, b) => a.localeCompare(b)).join('');
    if (acc[order]) {
      acc[order].push(char)
    } else {
      acc[order] = [char];
    }
  }
  for (let [_, value] of Object.entries(acc)) {
    o.push(value);
  }
  return o;
}

// Test Verification
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// Expected: [["eat","tea","ate"],["tan","nat"],["bat"]]