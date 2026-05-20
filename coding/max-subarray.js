function maxRevenueKMonths(revenues, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += revenues[i];
  }
}


console.log(maxRevenueKMonths([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8], 4));
// → 28  (months 6-9: 9+2+6+5)