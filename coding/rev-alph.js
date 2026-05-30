function reverse(str) {
  let o = "";
  for (let i = 0; i < str.length; i++) {
    const n = str[i+1]?str[i+1] : ""
    o += n + str[i];
    i++;
  }
  return o;
}

console.log(reverse("ABCDEF")); // BADCFE
console.log(reverse("ABCDEFG")); // BADCFEG