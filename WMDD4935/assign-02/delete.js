const firebase = require("firebase");

function deleteUserData(userId) {
    firebase.database().ref('users/' + userId).remove();
}

module.exports = deleteUserData;