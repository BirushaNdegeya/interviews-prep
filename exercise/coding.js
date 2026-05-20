const matrix = [
    [2, 1, 4],
    [1, 6, 9],
    [4, 9, 7]
];
let mtx = [
    [1,2],
    [3,4]
];
function columnSum(arr) {
    const sum = Array.from({ length: arr[0].length }, (_) => 0);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            sum[j] += arr[i][j]
        }
    }
    return sum;
}

function rowSum(arr) {
    let sum = Array.from({ length: arr[0].length}, (_) => 0);
    for (let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[0].length; j++) {
            sum[i] = arr[i][j];
        }
    }
    return sum;
}
console.log(columnSum(matrix));
console.log(columnSum(mtx));

console.log("====== row sum");
console.log(rowSum(matrix));
console.log(rowSum(mtx));