/*
let regex = /[a-z]/;
let rgx = /[^aeiou]/
const str = "hElO8394";

for (let i = 0; i < str.length; i++) {
  if (/[a-zA-Z]/.test(str[i])) {
    // console.log(str[i], ": alphabet");
  }
}
// console.log(rgx.test("sky"));

// console.log(/\d+/.test("ab8"));
// console.log()

// console.log(/^Hello/.test("Hello World"));
// console.log(/world$/.test("Dorine world"));

// console.log(/^\d{3}$/.test("123"));

// console.log(/\bcat\b/.test("The cat sat"));
// console.log(/\bcat\b/.test("cat-like"))

// console.log(/(ab)+/.test("ababhelo"));
console.log(/hello/i.test("Hello")); // case insensitive

let str = "The price is $42 and $100";
console.log(str.match(/\$\d+/g));

let str = "2024-01-15 and 2024-03-22";
let regex = /(\d{4})-(\d{2})-(\d{2})/g;

for (let match of str.matchAll(regex)) {
  console.log(match[0]); // full match
  // console.log(match[1]); // year
  // console.log(match[2]); // month
  // console.log(match[3]); // day
}
console.log("Hello WOrld".replace(/o|O/g, "0"));


let str = "hello world";
let result = str.replace(/\b\w/g, char => char.toUpperCase());
console.log(result);

// Swap first and last name
let name = "Doe, John";
let result = name.replace(/(\w+), (\w+)/, "$2 $1");
console.log(result); // "John Doe"

// Reformat date from MM/DD/YYYY to YYYY-MM-DD
let date = "03/15/2024";
let formatted = date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
console.log(formatted); // "2024-03-15"

function isValidInteger(n) {
  return /\d/.test(n);
}
console.log(isValidInteger(4.4));
console.log("Helloe".match(/(e)/gi).length);

*/
/**
 * @param {String} str 
 */
function numberFromString(str){
  const rgx = /\d/g
  return +str.match(rgx).join('')
}
console.log("dks4839dk")