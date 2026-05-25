const s = parseInt(readline());
const matrix = [];
const rowSums = [];
const colSums = Array(s).fill(0);

for (let i = 0; i < s; i++) {
    const inputs = readline().split(' ').map(n => parseInt(n));
    matrix.push(inputs);
    
    // Calculate row sum
    rowSums.push(inputs.reduce((sum, val) => sum + val, 0));
    
    // Calculate column sums
    for (let j = 0; j < s; j++) {
        colSums[j] += inputs[j];
    }
}

console.log(rowSums.join(' '));
console.log(colSums.join(' '));