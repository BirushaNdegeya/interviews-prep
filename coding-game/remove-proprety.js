/*
Problem: Write a function removeProperty(obj, prop) that safely checks if an object contains a specific property. If the property exists directly on the object, delete it from the object and return true. In all other cases (including missing properties, inherited prototype properties, or invalid inputs), return false.
Test Cases to Pass:
JavaScript
*/
/**
 * 
 * @param {Object} account 
 * @param { String } prop 
 * @returns { Boolean }
 */
function removeProperty(account, prop) {
  if (account && typeof (account) === "object" && Object.prototype.hasOwnProperty.call(account, prop) && !Object.prototype.hasOwnProperty.call(account, "constructor")) {
    if (account.hasOwnProperty(prop)) {
      delete account.prop;
    }
    return true;
  }
  return false;
}
const account = { id: 101, status: 'active', balance: 500 };


console.log(removeProperty(account, 'balance'));
// Expected: true (and account should now be { id: 101, status: 'active' })

console.log(removeProperty(account, 'nonExistent'));
// Expected: false

const protoObj = Object.create({ inheritedProp: "yes" });
console.log(removeProperty(protoObj, 'inheritedProp'));
// Expected: false (Must not delete inherited properties)

console.log(removeProperty(null, 'anyProp'));
// Expected: false