const http = require('http');
var urlList = [];
urlList.push(process.argv[2]);
urlList.push(process.argv[3]);
urlList.push(process.argv[4]);
var results = []
var count = 0

function getURLdata (index) {
    http.get(urlList[index], function(response){
        var data = {};
        data[index] = '';      
        response.setEncoding('utf-8');
        response.on('error', function(err){
            console.log(err);
        });
        response.on('data', function(chunk){
            data[index] += chunk;
        });


        response.on('end', function(){
            results[index] = data;
            count++;
            if (count == urlList.length){
                for (var i = 0; i < urlList.length; i++){
                    console.log(results[i][i]);
                } 
            }
        });

    });
}

for (var i = 0; i < urlList.length; i++)
    getURLdata(i);