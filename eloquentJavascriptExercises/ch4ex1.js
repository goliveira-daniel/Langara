function range (start, end, step) {
 	let arrNumbers = []
 	// console.log(step)
 	if (step == undefined) {step = 1}
 	// console.log(step)
	if (start < end) {
		for (var i = Number(start); i <= end; i += Number(step)) {
			arrNumbers.push(i)
		}
	}
	return arrNumbers
}

function sum (arr) {
	let sumNumbers = 0
	for (var i = 0; i < arr.length; i++) {
		sumNumbers += arr[i]
	}
	return sumNumbers
}

console.log(range(process.argv[2],process.argv[3], process.argv[4]))
console.log(sum(range(process.argv[2],process.argv[3], process.argv[4])));