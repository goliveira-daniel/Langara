const http = require("http");

let allData = ''

http.get(process.argv[2], function(res) {

	res.setEncoding("utf8");

	res.on("data", function(data) {
        allData += data
	});

    res.on("end", function() {
		console.log(allData.toString().length);
		console.log(allData);
	});

}).on('error', function(e) {
	console.log("Got error: " + e.message);
});