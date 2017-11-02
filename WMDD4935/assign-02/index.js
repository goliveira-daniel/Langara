const firebase = require("firebase");
const create = require("./create.js");
const read = require("./read.js");
const update = require("./update.js");
const del = require("./delete.js");

var config = {
    apiKey: "AIzaSyC6G4GDPiFqrueps0u6NrFIZ68P1J_mfIg",
    authDomain: "wmdd4935-2c2bd.firebaseapp.com",
    databaseURL: "https://wmdd4935-2c2bd.firebaseio.com",
    projectId: "wmdd4935-2c2bd",
    storageBucket: "",
    messagingSenderId: "166838085898"
};

firebase.initializeApp(config);

// Get a reference to the database service
// var database = firebase.database();

create(1,"Daniel", "test", null)
create(2,"test2", "test", null)
create(3,"test3", "test", null)
create(4,"test4", "test", null)
create(5,"test5", "test", null)

read(1)

update(1,'nathan', 'other test', 'blah')

del(4)