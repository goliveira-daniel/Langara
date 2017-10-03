// var utils = require('./utils.js')

function start(d){
    if (d.interval){
        clearInterval(d.interval);
        d.text('Start');
    } else {
        startDate = new Date().getTime();
        d.interval = setInterval(function(){
            // Get todays date and time
            let now = new Date().getTime();

            // Find the elapsed time between now an the start date
            var elapsedTime = now - startDate;

            // Time calculations for hours, minutes and seconds
            let hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
            let strElapsedTime = "" +  hours + minutes + seconds
            // Display the result in the element with id="elapsed-time"
            document.getElementById("elapsed-time").innerHTML = strElapsedTime.toHHMMSS();
        },1000);
        d.text('Solve');
    }
}

function shuffle(a) {
    let arr = a.slice();
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
}

var imgFilesPath = ['./images/0.jpg',
'./images/1.jpg',
'./images/2.jpg',
'./images/3.jpg',
'./images/4.jpg',
'./images/5.jpg',
'./images/6.jpg',
'./images/7.jpg',
'./images/8.jpg',
'./images/9.jpg',
'./images/10.jpg',
'./images/11.jpg',
'./images/12.jpg',
'./images/13.jpg',
'./images/14.jpg',
'./images/blank.jpg']

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function loadImages(imgTags, arrImg) {
    for (var index = 0; index < imgTags.length; index++) {
        imgTags[index].src = arrImg[index];
    }
}

$(document).ready(function(){
    let StartDate;
    let moves = 0;
    let tn_array = Array();
    // let interval;
    let ImgTag = $('.puzzle-slot')
    loadImages(ImgTag, imgFilesPath);

    $('button').on('click', function() {
        if ($(this).text() == "Start") {
            start($(this))
            loadImages(ImgTag, shuffle(imgFilesPath));
        } else {
            loadImages(ImgTag, imgFilesPath);
            clearInterval($(this).interval);
            $(this).text('Start');
            moves = 0
            $('#moves').text(moves)
        }
    })
    $('img').on('click', function() {
        if ($('button').text() != 'Start') {
            let $next = $(this).next()
            let $previous = $(this).prev()
            let $less4 = $(this).prev().prev().prev().prev()
            let $plus4 = $(this).next().next().next().next()
            if ($next.attr('src') == './images/blank.jpg') {
                $next.attr('src', $(this).attr('src'))
                $(this).attr('src', './images/blank.jpg')
                moves++
                $('#moves').text(moves)
            }
            if ($previous.attr('src') == './images/blank.jpg') {
                $previous.attr('src', $(this).attr('src'))
                $(this).attr('src', './images/blank.jpg')
                moves++
                $('#moves').text(moves)
            }
            if ($less4.attr('src') == './images/blank.jpg') {
                $less4.attr('src', $(this).attr('src'))
                $(this).attr('src', './images/blank.jpg')
                moves++
                $('#moves').text(moves)
            }
            if ($plus4.attr('src') == './images/blank.jpg') {
                $plus4.attr('src', $(this).attr('src'))
                $(this).attr('src', './images/blank.jpg')
                moves++
                $('#moves').text(moves)
            }
            tn_array = $("img").map(function() {
                return $(this).attr("src");
            }).get();
            if (tn_array.toString()===imgFilesPath.toString()) {
                alert('You won!')
            }
        }
    })
})