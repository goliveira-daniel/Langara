// Your code here.
let even = " #"
let uneven = "# "
let size = 16
let output = ""
for (i = 0; i < size; i++) {
  if (i % 2 === 0) 
    for (j = 0; j < size; j++) {
      output += even;
    }
    else
      for (k = 0; k < size; k++) {
        output += uneven;
      }
//}
console.log(output);
output = "";
}