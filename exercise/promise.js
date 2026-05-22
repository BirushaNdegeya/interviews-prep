/*Problem: Write a function ensureValue(value) that explicitly validates inputs. If the function is called without any arguments, or if the passed argument evaluates strictly to undefined, throw a clear JavaScript Error. Otherwise, return the target value directly.
Test Cases to Pass:
JavaScript
*/

/**
 * 
 * @param {any} data 
 */
function ensureValue(data) {
  console.log(data);
}

console.log(ensureValue('Valid Data')); 
// Expected: 'Valid Data'

console.log(ensureValue(null)); 
// Expected: null (null is valid, only undefined or missing should fail)

// To verify the error catching mechanism:
try {
    ensureValue();
    console.log("Failed Test");
} catch (e) {
    console.log("Passed Test"); // Expected output
}

try {
    ensureValue(undefined);
    console.log("Failed Test");
} catch (e) {
    console.log("Passed Test"); // Expected output
}
