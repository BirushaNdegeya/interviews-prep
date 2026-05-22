const [h, m, s] = [13, 30, 40];
const pad = n => String(n).padStart(2, '0');
const day = (24 * 3600) + (60 * 60) + 60;
const total = (h * 3600) + (m * 60) + s;
const remainder = day - total;
const hour = Math.floor(remainder / 3600);
const min = Math.floor((remainder % 60) / 60);
const sec = remainder % 60;
console.log(pad(hour), pad(min), pad(sec));