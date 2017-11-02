const firebase = require("firebase");

function updateUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).update({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

module.exports = updateUserData;