/**
 * Date Converter
 * @param {String} date 
 */

function convertDateFormat(date) {
  const re = /(?<m>[\d]{1,2})\/(?<d>[\d]{1,2})\/(?<y>[\d]{4})/g;
  if (!re.test(date)) {
    return ""
  }
  return date.replace(re, (...args) => {
    const groups = args[args.length - 1];
    const { m, d, y } = groups;
    return `${y}${m.padStart(2, "0")}${d.padStart(2, '0')}`
  })
}


console.log(convertDateFormat("3/9/2026"));   // Expected: "20260309"
console.log(convertDateFormat("12/31/2025")); // Expected: "20251231"
console.log(convertDateFormat("10/4/2024"));  // Expected: "20241004"
console.log(convertDateFormat(12345));         // Expected: ""
