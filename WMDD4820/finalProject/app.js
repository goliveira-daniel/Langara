// THIS ARRAY WAS USED TO GET THE MATURITY DATES AND VALUES FROM BRAZILIAN STOCK CHANGE. THE DATA IS SCRAPPED FROM THE "BOVESPA" WEBSITE, TURNED INTO JSON VALUES AND ARE AVAILABLE ON THE BELOW ADRESSES
const urls = ['https://data.import.io/extractor/10c8f910-781f-417c-bcbe-bd8a8114fd7f/json/latest?_apikey=6c16d8fb47a944048053c8e73c6875107e0036b545d52fcb1f8a6553c4cefd4a5edfb2afd691c968ba98b22bb8aaddc412bc6301e783d93b1a73e306f07916fbf2587691bd9cf835a71b4955dc81a4c0','https://data.import.io/extractor/b32a11f0-1aa1-4901-9af3-486861e02566/json/latest?_apikey=6c16d8fb47a944048053c8e73c6875107e0036b545d52fcb1f8a6553c4cefd4a5edfb2afd691c968ba98b22bb8aaddc412bc6301e783d93b1a73e306f07916fbf2587691bd9cf835a71b4955dc81a4c0']
// THAT'S IS THE RESULT OF CALLING THE ABOVE APIs
const jsonMaturityDates = '{"url":"http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-boletim-online-ptBR.asp?Acao=BUSCA&cboMercadoria=DI1","result":{"extractorData":{"url":"http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-boletim-online-ptBR.asp?Acao=BUSCA&cboMercadoria=DI1","resourceId":"e41de34dc2a563a77cff572600f730f4","data":[{"group":[{"Vencto":[{"text":"K17"}]},{"Vencto":[{"text":"M17"}]},{"Vencto":[{"text":"N17"}]},{"Vencto":[{"text":"Q17"}]},{"Vencto":[{"text":"U17"}]},{"Vencto":[{"text":"V17"}]},{"Vencto":[{"text":"X17"}]},{"Vencto":[{"text":"Z17"}]},{"Vencto":[{"text":"F18"}]},{"Vencto":[{"text":"G18"}]},{"Vencto":[{"text":"H18"}]},{"Vencto":[{"text":"J18"}]},{"Vencto":[{"text":"K18"}]},{"Vencto":[{"text":"N18"}]},{"Vencto":[{"text":"V18"}]},{"Vencto":[{"text":"F19"}]},{"Vencto":[{"text":"J19"}]},{"Vencto":[{"text":"N19"}]},{"Vencto":[{"text":"V19"}]},{"Vencto":[{"text":"F20"}]},{"Vencto":[{"text":"J20"}]},{"Vencto":[{"text":"N20"}]},{"Vencto":[{"text":"V20"}]},{"Vencto":[{"text":"F21"}]},{"Vencto":[{"text":"J21"}]},{"Vencto":[{"text":"N21"}]},{"Vencto":[{"text":"V21"}]},{"Vencto":[{"text":"F22"}]},{"Vencto":[{"text":"N22"}]},{"Vencto":[{"text":"F23"}]},{"Vencto":[{"text":"N23"}]},{"Vencto":[{"text":"F24"}]},{"Vencto":[{"text":"N24"}]},{"Vencto":[{"text":"F25"}]},{"Vencto":[{"text":"F26"}]},{"Vencto":[{"text":"F27"}]},{"Vencto":[{"text":"F28"}]},{"Vencto":[{"text":"F29"}]},{"Vencto":[{"text":"F30"}]}]}]},"pageData":{"resourceId":"e41de34dc2a563a77cff572600f730f4","statusCode":200,"timestamp":1491678020034},"timestamp":1491678020360,"sequenceNumber":0}}'
const jsonMaturityValues = '{"url":"http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-boletim-online-ptBR.asp?Acao=BUSCA&cboMercadoria=DI1","result":{"extractorData":{"url":"http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-boletim-online-ptBR.asp?Acao=BUSCA&cboMercadoria=DI1","resourceId":"e41de34dc2a563a77cff572600f730f4","data":[{"group":[{"ultPreco":[{"text":"11,411"}]},{"ultPreco":[{"text":"11,245"}]},{"ultPreco":[{"text":"10,850"}]},{"ultPreco":[{"text":"10,640"}]},{"ultPreco":[{"text":"10,350"}]},{"ultPreco":[{"text":"10,155"}]},{"ultPreco":[{"text":"10,000"}]},{"ultPreco":[{"text":"9,880"}]},{"ultPreco":[{"text":"9,760"}]},{"ultPreco":[{"text":"9,700"}]},{"ultPreco":[{"text":"9,650"}]},{"ultPreco":[{"text":"9,580"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"9,500"}]},{"ultPreco":[{"text":"9,480"}]},{"ultPreco":[{"text":"9,490"}]},{"ultPreco":[{"text":"9,550"}]},{"ultPreco":[{"text":"9,590"}]},{"ultPreco":[{"text":"9,660"}]},{"ultPreco":[{"text":"9,710"}]},{"ultPreco":[{"text":"9,790"}]},{"ultPreco":[{"text":"9,840"}]},{"ultPreco":[{"text":"9,900"}]},{"ultPreco":[{"text":"9,920"}]},{"ultPreco":[{"text":"9,960"}]},{"ultPreco":[{"text":"10,000"}]},{"ultPreco":[{"text":"10,020"}]},{"ultPreco":[{"text":"10,060"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"10,150"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"10,250"}]},{"ultPreco":[{"text":"10,260"}]},{"ultPreco":[{"text":"10,300"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"0,000"}]},{"ultPreco":[{"text":"0,000"}]}]}]},"pageData":{"resourceId":"e41de34dc2a563a77cff572600f730f4","statusCode":200,"timestamp":1491678022485},"timestamp":1491678022886,"sequenceNumber":0}}'
// THIS CODE WAS CALLED BY THE PROMISE, IT READS THE ARRAY OF API'S URL AND THEN MAKE A FETCH CALL FOR EVERY ELEMENT OF THE ARRAY 
const grabContent = url => { 
	fetch(url)
     .then(res => res.json())
     .then(data => {
     	let test = data.result.extractorData.data[0].group
     	console.log(test)}
     	)
 }
// THIS CODE WAS USED TO RESOLVE THE ASYNC CODE, AND ONLY FIRE THE FUNCTION WHEN BOTH CALLS WERE RESOLVED.
	// Promise
	//     .all(urls.map(grabContent))
	//     .then(() => console.log(`Urls ${urls} were grabbed`))
// ================================================================
const today = new Date()
console.log(today)
const objBond = (name, interestRateType, interestRateValue, timeToMaturity, faceValue) => {
	let obj = {
	  name,
	  interestRateType,
	  interestRateValue,
	  timeToMaturity,
	  faceValue,
	  // isTaxed: false
	  calcFutureValue() {
	  	if (this.interestRateType.toLowerCase() == 'fixed') {
	  		return calcFixed(this.faceValue,this.interestRateValue,this.timeToMaturity)
	  	}
	  	else {
            return calcFixed(this.faceValue, getRate(searchIndex(today.setDate(today.getDate() + Number(this.timeToMaturity)), objFutureContracts), this.interestRateValue), this.timeToMaturity)
	  	}
	  }
	}
  return obj
}

function getRate(rate, perc) {
	rate = rate.replace(',','.')
	return Number(rate) * (Number(perc) / 100)
	// return rate * (perc / 100)
	// body...
}

// const objFutureContracts = (contractMaturity, contractValue) => {
// 	let obj = {
// 		contractMaturity,
// 		contractValue
// 	}
// }

let objFutureContracts = []

JSON.parse(jsonMaturityDates, (key, value) => {
  if (key == 'Vencto') {
  	objFutureContracts.push(changeKeyName(value[0]))
  	// changeMaturityDate(value[0])
  }
  return value
})

let count = 0

function changeKeyName(obj) {
	let str = JSON.stringify(obj);
	str = str.replace(str.substr(9,3), changeMaturityDate(str.substr(9,3)));
	str = str.replace(/text/g, 'maturityDate');
	obj = JSON.parse(str);
	return obj
}

JSON.parse(jsonMaturityValues, (key, value) => {
  if (key == 'ultPreco') {
  	objFutureContracts[count].maturityValue = value[0].text
  		// .maturityDateFormat = changeMaturityDate
  	count++
  }
  return value
})

function changeMaturityDate(str) {
	// let str = obj.maturityDate
	str = '01/' + str.substr(0,1) + '/20' + str.substr(1,2)
	switch (str.substr(3,1)) {
    case 'F':
    	str = str.replace('F', '01')
        break;
    case 'G':
    	str = str.replace('G', '02')
        break;
    case 'H':
    	str = str.replace('H', '03')
        break;
    case 'J':
    	str = str.replace('J', '04')
        break;
    case 'K':
    	str = str.replace('K', '05')
        break;
    case 'M':
    	str = str.replace('M', '06')
        break;
    case 'N':
    	str = str.replace('N', '07')
    	break;
    case 'Q':
        str = str.replace('Q', '08')
        break;
    case 'U':
        str = str.replace('U', '09')
        break;
    case 'V':
        str = str.replace('V', '10')
        break;
    case 'X':
        str = str.replace('X', '11')
        break;
    case 'Z':
        str = str.replace('Z', '12')
	}
    return str
}

console.log(objFutureContracts)

const btn = document.querySelector("button")
const p1 = document.getElementById("bond1_result")
const p2 = document.getElementById("bond2_result")

btn.addEventListener('click', (e) => {
	e.preventDefault()
	let bond1 = objBond(document.getElementById("Bond1").value,document.getElementById("interestRateType1").value, document.getElementById("interestRateValue1").value, 
		document.getElementById("timeToMaturity1").value,
		document.getElementById("faceValue1").value)
	let bond2 = objBond(document.getElementById("Bond2").value,document.getElementById("interestRateType2").value, document.getElementById("interestRateValue2").value, 
		document.getElementById("timeToMaturity2").value,
		document.getElementById("faceValue2").value)
	p1.innerHTML = userFriendlyMsg(today.setDate(today.getDate() + Number(bond1.timeToMaturity)),bond1.calcFutureValue())
	p2.innerHTML = userFriendlyMsg(today.setDate(today.getDate() + Number(bond2.timeToMaturity)),bond1.calcFutureValue())
})

function calcFixed(value, rate, period) {
	let futureValue = 0
	futureValue = value * (1+(rate/100))^(period/360)
	return futureValue
}

function searchIndex(futureDate, futureContracts) {
	let f = new Date()
	for (let i = 0; i < futureContracts.length; i++) {
		f = Date.parse(futureContracts[i].maturityDate)
		if (futureDate <= f) {
			return futureContracts[i].maturityValue
		}
	}
}

function userFriendlyMsg(maturityDate, futureValue) {
	return `The value of this bond on ${maturityDate} is $${futureValue}`
}

Date.prototype.addDays = function addDays(days) {
    let result = new Date(this);
    console.log(result.getDate())
    result.setDate(result.getDate() + days)
    return result;
}