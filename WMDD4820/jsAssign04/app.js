const div = document.getElementsByClassName("displayWeather")[0];
let u;
const strAppId = 'f0373122cbf7234988fabd5c169a4b0f'
// const strUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + strCityName + ',' + strCountryCode + '&APPID=' + strAppId
// api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111

const btn = document.querySelector("button")

btn.addEventListener('click', (e) => {
	e.preventDefault()
	// ul = document.getElementsByTagName("UL")
	// console.log(ul.length)
	// if (ul != undefined) {
	// 	ul.parentNode.removeChild(ul)
	// }
	// div.removeChild('ul')
	reqWeather(document.getElementById("city").value, document.getElementById("country").value)
})

function reqWeather(cityName, countryCode) {
	fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + ',' + countryCode + '&APPID=' + strAppId + '&units=metric')
		.then((resp) => resp.json())
		.then(function(data) {
		let resWeather = data.list
		console.log(resWeather)
		console.log(resWeather.length)
		ul = createNode('ul')
		append(div, ul)
		for (let i = 2; i <= resWeather.length; i+=8) {
			let li = createNode('li'),
          		img = createNode('img'),
          		temp = createNode('p');
          		date = createNode('p');
      		date.innerHTML = `Forecast on ${resWeather[i].dt_txt}`;
      		temp.innerHTML = `Temperature ${resWeather[i].main.temp}`;
      		img.src = 'images/' + resWeather[i].weather[0].icon + '.png'
      		append(li, date);
      		append(li, temp);
      		append(li, img);
      		append(ul, li);
		}
	})
	.catch(function(error) {
    	console.log(error)
	})
}

function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}