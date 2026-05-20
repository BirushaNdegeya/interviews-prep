
/**
 * Product Of Array Algo
 * @param {Array} arr 
 */
function productOfArray(arr) {
  if (arr.length === 0) {
    return 1;
  }
  return arr[0] * productOfArray(arr.slice(1));
}


console.log(productOfArray([1, 2, 3])) // toEqual(6)
console.log(productOfArray([0, 1, 2, 3])) // toEqual(0)
console.log(productOfArray([1, -2, 3])) // toEqual(-6)
console.log(productOfArray([2])) // toEqual(0)