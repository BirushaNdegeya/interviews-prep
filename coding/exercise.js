// Match a literal dot (period)
let regex = /3\.14/;
console.log(regex.test("3.14")); // true
console.log(regex.test("3x14")); // false (. is escaped, so it's literal)