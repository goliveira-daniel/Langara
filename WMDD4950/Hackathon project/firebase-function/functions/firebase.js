"use strict";

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

/**
 * Inserts a node to the firebase database.
 *
 * @param {!obj} JSON object to be inserted in the database.
 */
exports.insert = obj => {
// function addToFirebase(obj) {
    return admin
        .database()
        .ref("/")
        .push(obj)
        .then(snapshot => {
            console.log(`Entry inserted on database ${JSON.stringify(snapshot)}`);
            return Promise.resolve();
        })
        .catch(err => {
            reject(err);
        });
}