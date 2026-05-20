// Write a functiion called same, which accpets two arrays. 
// The function should return true if every valiue in the array has i'ts corresponding value squared in the second array. 
// The frequrency must be the same


function same(arr1, arr2) {
	if (arr1.length != arr2.length) return false;
	const freqArr1 = {};
	const freqArr2 = {};

	for (let i = 0; i < arr1.length; i++) {
		const singleN = arr1[i]
		if (freqArr1[singleN] > 0) {
			freqArr1[singleN] = freqArr1[singleN] + 1;
		} else {
			freqArr1[singleN] = 1;
		}
	}


	for (let i = 0; i < arr2.length; i++) {
		const arr2Elt = arr2[i];
		freqArr2[arr2Elt] = (freqArr2[arr2Elt] || 0) + 1;
	}

	//console.log(freqArr2);
	//console.log(arr2);
	// Now Working with the frequence
	// how to make a for loop in an object in javascript
	
	for (let i = 0; i < arr1.length; i++) {
		console.log(freqArr2[i]);
	}
	console.log(freqArr2[0]);
	console.log(freqArr1.length);
	console.log(freqArr2);

	return true;
}


console.log(same([1, 2, 1], [4, 4, 1]), false); // false (wrong frequency)
console.log(same([1, 2, 3], [4, 1, 9]), true); // true
console.log(same([1, 2, 3], [1, 9]), false); // false (different lengths)
console.log(same([2, 3, 4], [4, 9, 16]), true); // true
console.log(same([1, 2, 3, 2], [9, 1, 4, 4]), true); // true
