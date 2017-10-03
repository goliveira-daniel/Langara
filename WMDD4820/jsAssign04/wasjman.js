// const url = 'http://globalmetals.xignite.com/xGlobalMetals.json/GetRealTimeMetalQuote?Symbol=XAUKG&Currency=CAD&_token=5B76311D5A2C4C75BC9488AFA2E52273' 
//const fs = require('fs');

function myFunction() {
    let goldWeight, goldPercent;

    // Get the value of the input field with id="numb"
    water = Number(document.getElementById("waterWeight").value);
    normal = Number(document.getElementById("normalWeight").value);
    goldPercent = ((normal/water)*5);
    goldWeight = ((normal/100)*goldPercent);



    myKarat(goldPercent);

}

function myKarat(goldPercent) {
    let text;


    if  (goldPercent >= 37.5 && goldPercent < 41.7) {
        text = "This alloy is 9K";
    } else if  (goldPercent >= 37.5 && goldPercent < 41.7) {
        text = "This alloy is 9K";
    } else if  (goldPercent >= 41.7 && goldPercent < 50) {
        text = "This alloy is 10K";
    } else if  (goldPercent >= 50 && goldPercent < 58.3) {
        text = "This alloy is 12K";
    } else if  (goldPercent >= 58.3 && goldPercent < 75) {
        text = "This alloy is 14K";
    } else if  (goldPercent >= 75 && goldPercent < 91.7) {
        text = "This alloy is 18K";
    } else if  (goldPercent >= 91.7 && goldPercent < 99.9) {
        text = "This alloy is 22K";
    } else if  (goldPercent == 99.9) {
        text = "This alloy is 24K";
    } else { text = "This alloy is lower then 9K"; }

    document.getElementById("demo3").innerHTML = text;

    document.getElementById("demo").innerHTML =(`With a purity of `+ Number(goldPercent).toFixed(2)+ `% gold.`);
    // document.getElementById("demo2").innerHTML =(`There are `+  Number(goldWeight).toFixed(2)+ `g of pure gold in it.`);
    // let header = new Headers({
    //     'Access-Control-Allow-Origin':'*',
    // });

    // let sentData={
    //     mode: 'cors',
    //     header: header,
    // };
    
    fetch('http://globalmetals.xignite.com/xGlobalMetals.json/GetRealTimeMetalQuote?Symbol=XAUKG&Currency=CAD&_token=5B76311D5A2C4C75BC9488AFA2E52273', {
        mode: 'cors',
        headers: {'Access-Control-Allow-Origin':'*'}
    })
        // .then((resp) => resp.json())
        .then((resp) => console.log(resp))
        .then(function(data) {
            console.log(data)
    })

    // let resultApi = JSON.parse(JSON.stringify({"Outcome":"Success","Message":null,"Identity":"Request","Delay":0.0739169,"Name":"Gold 1 Kg","Symbol":"XAUKG","Unit":"1 kilogram","QuoteType":"Calculated","Currency":"CAD","Date":"04/04/2017","Time":"5:01:00 AM","Bid":53999.62,"Mid":54065.96,"Ask":54132.3,"Spread":132.6813,"Source":"Quotes calculated by crossing via CHF"}))


    // console.log(resultApi);

    // let testMid = resultApi["Mid"]

    // console.log(testMid);
}

//  })
//  .catch(function(error) {
//      console.log(error)
//  })
// }
// function myFun() {
//     var str = JSON.parse(JSON.s{"Outcome":"Success","Message":null,"Identity":"Request","Delay":0.0739169,"Name":"Gold 1 Kg","Symbol":"XAUKG","Unit":"1 kilogram","QuoteType":"Calculated","Currency":"CAD","Date":"04/04/2017","Time":"5:01:00 AM","Bid":53999.62,"Mid":54065.96,"Ask":54132.3,"Spread":132.6813,"Source":"Quotes calculated by crossing via CHF"});
//     var n = str.indexOf("Mid");
//     document.getElementById("demoMid").innerHTML = n;
// }


// myFun();




//http://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate?Symbol=EURUSD&_token=[YOUR_TOKEN]

//5B76311D5A2C4C75BC9488AFA2E52273



//http://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate?Symbol=EURUSD&_token=[5B76311D5A2C4C75BC9488AFA2E52273]



// 'use strict';
// function StreamdataService(streamdataAppToken, xigniteToken, bus) {
//   var eventSources = {};

//   function fetchJson(currency) {
//     var xigniteURL = "https://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate";
//     //Build URL with proper params
//     xigniteURL = xigniteURL + "?Symbol=" + currency + "&_token=" + xigniteToken;

//     var eventSource = new Streamdata(xigniteURL, streamdataAppToken, currency);
//     eventSources[currency] = eventSource;
//     eventSource.open();
//   }

//   function stopFetchJson(currency) {
//     eventSources[currency].close();
//   }

//   return {
//     fetchJson: fetchJson,
//     stopFetchJson: stopFetchJson
//   }
// }

// console.log(fetch('http://globalmetals.xignite.com/xGlobalMetals.json/GetRealTimeMetalQuote?Symbol=XAUKG&Currency=CAD&_token=5B76311D5A2C4C75BC9488AFA2E52273'));

    // result.then(function(response) {
    //   console.log('response', response)
    //   console.log('header', response.headers.get('Content-Type'))
    //   return response.text()
    // }).then(function(text) {
    //   console.log('got text', text)
    // }).catch(function(ex) {
    //   console.log('failed', ex)
    // })


//http://www.quandl.com/api/v3/datasets/LBMA/GOLD

// teste ();

// function teste() {

//      fetch('http://globalmetals.xignite.com/xGlobalMetals.json/GetRealTimeMetalQuote?Symbol=XAUKG&Currency=CAD&_token=5B76311D5A2C4C75BC9488AFA2E52273')
//          .then((resp) => resp.json())
//          .then(function(data) {
//          let goldPrice = data.Mid

//           document.getElementById("gprice").innerHTML = goldPrice;


//  document.getElementById("priceNow").innerHTML =(`There are `+  Number(goldPrice).toFixed(2)+ `g of pure gold in it.`);

//  document.getElementById("valueNow").innerHTML =(`There are `+  Number(goldPrice).toFixed(2)+ `g of pure gold in it.`);

//const data = fs.writeFileSync('data.txt', totalVal, 'utf8')