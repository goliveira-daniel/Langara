// Your code here.
let text = ""
for (i = 1; i <= 100; i++) {
  switch (true) {
    case i % 3 === 0:
        text = "Fizz";
      if (i % 5 === 0) {
        text += "Buzz";
      }
      break;
    case i % 5:
        text = "Buzz";
        break;
    default:
        text = i;
  }
  console.log(text)
  text = ""
}   