const div = document.getElementsByClassName("displayWeather")[0];
const strAppId = 'f0373122cbf7234988fabd5c169a4b0f'

const btn = document.querySelector("button")

btn.addEventListener('click', (e) => {
	e.preventDefault()
	reqWeather(document.getElementById("city").value, document.getElementById("country").value)
})

function reqWeather(cityName, countryCode) {
	fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + ',' + countryCode + '&APPID=' + strAppId + '&units=metric')
		.then((resp) => resp.json())
		.then(function(data) {
			console.log(data)
			if (div.children.length = 0) {
	  			let img = createNode('img')
	  			append(div, img);
			}
	  		img.src = 'images/' + selectFolder(data.list[0].weather[0].id) + '/' + selectRandomImage() + '.jpg'
		})
	.catch(function(error) {
    	console.log(error)
	})
}

function selectRandomImage() {
	return Math.floor((Math.random() * 10) + 1);
}

function selectFolder(argument) {
	let str = argument.toString()
	return str.substr(0,1) + '00'
}

function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}