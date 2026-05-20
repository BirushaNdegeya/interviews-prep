// Recursive binary search

/**
 *
 * @param {Array} list list
 * @param {Number} target number
 * @returns {Boolean}
 */
function recursiveBinarySearch(list, target) {
  if (list.length === 0) return null;

  let midpoint = Math.floor(list.length / 2);

  if (list[midpoint] === target) {
    return true;
    //
  } else if (list[midpoint] < target) {
    return recursiveBinarySearch(list.slice(midpoint + 1), target);
  } else {
    return recursiveBinarySearch(list.slice(0, midpoint), target);
  }
}

function verify(index) {
  if (index) {
    console.log("Target found");
  } else {
    console.log("Target not found in the list");
  }
}

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const resp1 = recursiveBinarySearch(numbers, 12);
const resp2 = recursiveBinarySearch(numbers, 10);
verify(resp1);
verify(resp2);
