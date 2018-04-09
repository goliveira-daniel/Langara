firebase.initializeApp({
	databaseURL: 'https://test-eb50e.firebaseio.com/'
})

const db = firebase.database()
const ref = db.ref('sensors')
let keys
let k
const sun = document.getElementById("sunN")
const drop = document.getElementById("dropN")
const d1 = document.getElementById("d1")
const d2 = document.getElementById("d2")
const d3 = document.getElementById("d3")
const d4 = document.getElementById("d4")
const d5 = document.getElementById("d5")
const s1 = document.getElementById("s1")
const s2 = document.getElementById("s2")
const s3 = document.getElementById("s3")
const s4 = document.getElementById("s4")
const s5 = document.getElementById("s5")
const main = document.getElementById("main")
const not1 = document.getElementById("not1")
const not2 = document.getElementById("not2")
let state = false

function getDB(){ 
  ref.on('value', data => { 
    let html = '<div class="display"><table><tr>'
    let values = data.val()
    let keys = Object.keys(values)
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      k = keys[i]
      let temp = values[k].temperature
      let hum = values[k].humidity
      let date = values[k].timestamp 
      let moi = values[k].moisture
      let lux = values[k].light     
    }
    let seconds = values[k].timestamp
    let d = new Date(seconds*1000)
    console.log(values[k]) 
    if(values[k].moisture > 0 && values[k].moisture <= 10){
        d1.classList.add("colour")
        d2.classList.remove("colour")
        d3.classList.remove("colour")
        d4.classList.remove("colour")
        d5.classList.remove("colour")
        drop.classList.remove("hidden")
        notification()       
    } else if(values[k].moisture > 10 && values[k].moisture <= 20){
        d1.classList.add("colour")
        d2.classList.add("colour")
        d3.classList.remove("colour")
        d4.classList.remove("colour")
        d5.classList.remove("colour")
        drop.classList.remove("hidden")
        notification()
    } else if(values[k].moisture > 20 && values[k].moisture <= 30){
        d1.classList.add("colour")
        d2.classList.add("colour")
        d3.classList.add("colour")
        d4.classList.remove("colour")
        d5.classList.remove("colour")
        drop.classList.add("hidden")
        congrats()
    }else if(values[k].moisture > 30 && values[k].moisture <= 40){
        d1.classList.add("colour")
        d2.classList.add("colour")
        d3.classList.add("colour")
        d4.classList.add("colour")
        d5.classList.remove("colour")
        drop.classList.add("hidden")
        congrats()
    } else if(values[k].moisture >40){
      d1.classList.add("colour")
        d2.classList.add("colour")
        d3.classList.add("colour")
        d4.classList.add("colour")
        d5.classList.add("colour")
        drop.classList.add("hidden")
        congrats()
    }
    if(values[k].temperature > 0 && values[k].temperature <= 8){
        s1.classList.add("colour")
        s2.classList.remove("colour")
        s3.classList.remove("colour")
        s4.classList.remove("colour")
        s5.classList.remove("colour")
        sun.classList.remove("hidden")
    } else if(values[k].temperature > 8 && values[k].temperature <= 16){
        s1.classList.add("colour")
        s2.classList.add("colour")
        s3.classList.remove("colour")
        s4.classList.remove("colour")
        s5.classList.remove("colour")
        sun.classList.remove("hidden")
    } else if(values[k].temperature > 16 && values[k].temperature <= 24){
        s1.classList.add("colour")
        s2.classList.add("colour")
        s3.classList.add("colour")
        s4.classList.remove("colour")
        s5.classList.remove("colour")
        sun.classList.add("hidden")
    }else if(values[k].temperature > 24 && values[k].temperature <= 32){
        s1.classList.add("colour")
        s2.classList.add("colour")
        s3.classList.add("colour")
        s4.classList.add("colour")
        s5.classList.remove("colour")
        sun.classList.add("hidden")
    } else if(values[k].temperature >32){
        s1.classList.add("colour")
        s2.classList.add("colour")
        s3.classList.add("colour")
        s4.classList.add("colour")
        s5.classList.add("colour")
        sun.classList.add("hidden")
    }
  })
}

function notification(){
    setTimeout(function(){
        if(state == false){
            main.classList.add("hidden")
            not1.classList.remove("hidden")
        }
    }, 3000)
}

function congrats(){
    setTimeout(function(){
        if(state == true){
            main.classList.add("hidden")
            not2.classList.remove("hidden")
        }
     }, 3000)
}

function changeState(){
    if(state == false){
        state = true
        main.classList.remove("hidden")
        not1.classList.add("hidden")

    } else{
        state = false
        main.classList.remove("hidden")
        not2.classList.add("hidden")
    }
}

getDB()

