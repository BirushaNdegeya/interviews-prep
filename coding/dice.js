const [a, b] = [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
const ref = {
  "0": ['   ', '   ', '   '],
  "1": ["   ", " * ", "   "],
  "2": ["*  ", '   ', '  *'],
  "3": ['*  ', ' * ', '  *'],
  '4': ['* *', '   ', '* *'],
  "5": ['* *', " * ", "* *"],
  '6': ['***', '   ', '***']
}
console.log("+---+");
ref[a].forEach(element => {
  console.log("|" + element + "|")
});
console.log("+---+");
ref[b].forEach(element => {
  console.log("|" + element + "|")
});
console.log("+---+");