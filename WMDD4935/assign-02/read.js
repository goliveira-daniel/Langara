const firebase = require("firebase");

function readUserData(userId) {
    firebase.database().ref('users/' + userId).on('value', (data) => {data.val()});
}

module.exports = readUserData;