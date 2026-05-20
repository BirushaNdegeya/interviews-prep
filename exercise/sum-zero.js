/**
 * 
 * @param {Array} arr 
 */


function sumZero(arr) {
  let left = 0;
  let rigth = arr.length - 1;
  while (left < rigth) {
    const sum = arr[left] + arr[rigth];
    if (sum == 0) {
      return [arr[left], arr[rigth]];
    } else if (sum > 0) {
      end--;
    } else {
      left++;
    }
  }
}

console.log(sumZero([-3, -1, 0, 2, 3]));
/*
solution naive
function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == 0) {
        return [arr[i], arr[j]]
      }
    }
  }
}
*/
