function reverseArray (arr) {
	for (let i = arr.length; i = 0; i--) {
		arr.push(arr.shift(i))
	}
	return arr
}

console.log(reverseArray(['A','B','C']))