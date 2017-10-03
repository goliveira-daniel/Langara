// Set the date we're counting down to
var startDate = new Date().getTime();

// Update the count down every 1 second
var x = setInterval(function() {

// Get todays date and time
var now = new Date().getTime();

// Find the distance between now an the count down date
var elapsedTime = now - startDate;

// Time calculations for days, hours, minutes and seconds
// var days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
var hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

// Display the result in the element with id="demo"
document.getElementById("elapsed-time").innerHTML = hours + "h "
+ minutes + "m " + seconds + "s ";

// If the count down is finished, write some text 
//   if (elapsedTime < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
}, 1000);

// var dir = "./images/";
// var fileextension = ".jpg";
// //This will retrieve the contents of the folder if the folder is configured as 'browsable'
// $.ajax({
//     url: dir,
//     success: function (data) {
//         //List all .png file names in the page
//         $(data).find("a:contains(" + fileextension + ")").each(function () {
//             var filename = this.href.replace(window.location.host, "").replace("http://", "");
//             $("body").append("<img src='" + dir + filename + "'>");
//         });
//     }
// });