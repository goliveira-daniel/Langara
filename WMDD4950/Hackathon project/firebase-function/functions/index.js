"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const storage = require("@google-cloud/storage")();
// const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");
const os = require("os");
const vision = require("./vision.js")
const imagemagick = require('./imagemagick.js')
const firebase = require("./firebase.js")

/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} function The callback function.
 */
exports.processImage = functions.storage.object().onChange(event => {
  const object = event.data;
  console.log("Processing file: " + event.data.name);

  // Check if the function should execute otherwise stop here.
  if (object.resourceState === "not_exists") {
    console.log("This is a deletion event.");
    return;
  } else if (!object.name) {
    console.log("This is a deploy event.");
    return;
  } else if (path.parse(object.name).dir !== "images") {
    console.log("This is not on images folder.");
    return;
  }

  const bucketFile = storage.bucket(object.bucket).file(object.name);
  const tempFile = path.join(os.tmpdir(), path.parse(bucketFile.name).base);
  const newGame = {
    gameId: object.generation || Math.floor(Math.random() * 10000000 + 1),
    grid: {
      noOfColumns: 4,
      noOfLines: 4
    },
    assets: {
      tiles: [],
      audioHints: [],
      imageLabels: []
    },
    gameSolution: [],
    completeImage: {
      bucketName: object.bucket,
      fileName: bucketFile.name,
      link: object.selfLink || ""
    }
  };

  bucketFile
    .download({ destination: tempFile })
    .catch(err => {
      console.error("Failed to download file.", err);
      return Promise.reject(err);
    })
    .then(() => {return vision.labelDetection(tempFile)})
    .then((labels) => {
      newGame.assets.audioHints = labels
      return resolve()
    })
    .then(() => {return imagemagick.slice(tempFile, newGame.grid.noOfColumns)})
    .then(() => {
      console.log(`node to be inserted in the firebase ${JSON.stringify(newGame)}`);
      
      for (let index = 0; index < Math.pow(4, 2); index++) {
        newGame.assets.tiles.push(
          JSON.parse(`{"bucketName": "tiles/${path.parse(bucketFile.name).name}_${index}${path.extname(bucketFile.name)}",
          "fileName": "${object.bucket}"}`)
        );
        newGame.gameSolution.push(`${path.parse(bucketFile.name).name}_${index}${path.extname(bucketFile.name)}`)
      }
      
      return firebase.insert(newGame);
    })
    .catch(err => {
      console.error("Something went wrong: ", err);
      return Promise.reject(err);
    })
  //  callback();
});