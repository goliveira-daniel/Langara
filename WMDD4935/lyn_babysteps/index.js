let element = 0;

for (var index = 2; index < process.argv.length; index++) {
    element += Number(process.argv[index]);
}

console.log(element)