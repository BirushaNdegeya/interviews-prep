// Binary Search


/***
 * Binary Search Algo
 * @param {Array} list 
 * @param {Number} target 
 */
function binarySearch(list, target) {
	let start = 0;
	let end = list.length - 1;
	while (start <= end) {
		let mid = Math.floor((start + end) / 2);
		let guess = list[mid];

		if (guess === target) {
			return mid;
		}
		if (guess > target) {
			end = mid - 1;
		} else {
			start = mid + 1;
		}
	}
	return -1;
}
console.log(binarySearch([1,2,3,4,5,6,7,8], 4))