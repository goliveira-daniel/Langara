let userArray = process.argv.slice(2);
let data = {};
[, data.username, data.email] = userArray;
console.log(data)