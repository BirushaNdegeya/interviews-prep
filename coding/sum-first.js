let arr = [4, 38, 39, 8, 94]
let max1 = -Infinity, max2 = -Infinity;
for(let num of arr) {
    if(num >= max1) {
        max2 = max1;
        max1 = num;
    } else if(num >= max2 && num !== max1) {
        max2 = num;
    }
    // console.log(max1, max2);
}
console.log(max1, max2);
// console.log(max1 + max2);
