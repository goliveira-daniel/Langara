// Your code here.
function countBs(param) {
  return countChar(param, "B");
}
  
function countChar(param1, param2) {
  var counter = 0;
  for (i = 0; i < param1.length; i++) {
    if (param1.charAt(i) == param2)
      counter += 1;
  }
  return counter;
}
console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4