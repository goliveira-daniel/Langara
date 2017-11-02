const firebase = require("firebase");

function readUserData(userId) {
    firebase.database().ref('users/' + userId).on('value', function(data) {
        // data.val()
        console.log(data.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
    });
}

module.exports = readUserData;