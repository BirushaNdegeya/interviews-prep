let arr = [8, 3, 9, 2, 0, 1, 2, 9, 10];
let max1 = -Infinity;
let max2 = -Infinity;
for (let i = 0; i < arr.length; i++) {
  const num = arr[i];
  if (num >= max1) {
    max2 = max1;
    max1 = num;
  } else if (num >= max2 && num !== max1) {
    max2 = num;
  }
}
console.log(max1, max2);