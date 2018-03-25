"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const path = require("path");
// const sliceImage = require('sliceImage')
const storage = require("@google-cloud/storage")();
const exec = require("child_process").exec;
const fs = require("fs");
const os = require("os");
const vision = require("./vision.js")

/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} function The callback function.
 */
exports.processImage = functions.storage.object().onChange(event => {
  console.log("Processing file: " + event.data.name);
  const object = event.data;

  // Exit if this is a deletion or a deploy event.
  if (object.resourceState === "not_exists") {
    console.log("This is a deletion event.");
    return;
  } else if (!object.name) {
    console.log("This is a deploy event.");
    return;
  }

  // Exit if this is triggered on a file that is not on images folder.
  if (path.parse(object.name).dir === "tiles") {
    console.log("This is not on images folder.");
    return;
  }

  const file = storage.bucket(object.bucket).file(object.name);

  vision.getLabels(file)

  //   console.log(`CHECK THIS OUT: ${JSON.stringify(object)}.`);
  console.log(`Slicing ${file.name}.`);

  sliceImage(file, 4);
  let node = {
    gameId: object.generation || Math.floor(Math.random() * 10000000 + 1),
    grid: {
      noOfColumns: 4,
      noOfLines: 4
    },
    assets: {
      tiles: [],
      audioHints: []
    },
    gameSolution: [],
    completeImage: {
      bucketName: object.bucket,
      fileName: file.name,
      link: object.selfLink || ""
    }
  };

  console.log(`node to be inserted in the firebase ${JSON.stringify(node)}`);

  for (let index = 0; index < Math.pow(4, 2); index++) {
    node.assets.tiles.push(
      JSON.parse(`{"bucketName": "tiles/${path.parse(file.name).name}_${index}${path.extname(file.name)}",
                  "fileName": "${object.bucket}"}`)
    );
    node.gameSolution.push(`${path.parse(file.name).name}_${index}${path.extname(file.name)}`)
  }

  return addToFirebase(node);
  //  callback();
});

function addToFirebase(obj) {
  // const original = request.body.text;
  // console.log(request.body)
  // console.log(request.query)
  // console.log(original)
  return admin
    .database()
    .ref("/")
    .push(obj)
    .then(snapshot => {
      // return response.status(200).send(snapshot);
      console.log(`Entry inserted on database ${JSON.stringify(snapshot)}`);
      return Promise.resolve();
    })
    .catch(err => {
      reject(err);
    });
}

/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!file} event the image file to be sliced.
 * @param {!amountOfTiles} Number of Tiles to be created.
 */
// Slice the given file using ImageMagick.
function sliceImage(file, amountOfTiles) {
  // const tempLocalFilename = path.parse(file.name).base;
  const tempLocalFilename = path.join(os.tmpdir(), path.parse(file.name).base);
  const baseFileName = path.basename(
    path.parse(file.name).base,
    path.extname(file.name)
  );
  const tempLocalFilenameNoExt = path.join(os.tmpdir(), baseFileName);
  const baseFileExtension = path.extname(file.name);

  // Download file from bucket.
  console.info(`Trying to download ${tempLocalFilename}`);
  return file
    .download({ destination: tempLocalFilename })
    .catch(err => {
      console.error("Failed to download file.", err);
      return Promise.reject(err);
    })
    .then(() => {
      console.log(
        `Image ${
          path.parse(file.name).base
        } has been downloaded to ${os.tmpdir()}.`
      );

      // Slice the image using ImageMagick.
      return new Promise((resolve, reject) => {
        exec(
          `convert ${tempLocalFilename} -crop ${amountOfTiles}x${amountOfTiles}@ +repage  +adjoin ${tempLocalFilenameNoExt}_%d${baseFileExtension}`,
          { stdio: "ignore" },
          (err, stdout) => {
            if (err) {
              console.error("Failed to slice image.", err);
              reject(err);
            } else {
              resolve(stdout);
            }
          }
        );
      });
    })
    .then(() => {
      for (let index = 0; index < Math.pow(amountOfTiles, 2); index++) {
        // const element = array[index];

        console.log(
          `Uploading tiles ${tempLocalFilenameNoExt}_${index}${baseFileExtension}`
        );

        // Upload the Sliced image back into the bucket.
        file.bucket
          .upload(`${tempLocalFilenameNoExt}_${index}${baseFileExtension}`, {
            destination: `tiles/${baseFileName}_${index}${baseFileExtension}`
          })
          .catch(err => {
            console.error("Failed to upload slice image.", err);
            return Promise.reject(err);
          });
      }
      return Promise.resolve;
    })
    .then(() => {
      console.log(`Deleting file ${tempLocalFilename}.`);

      // Delete the temporary file.
      return new Promise((resolve, reject) => {
        fs.unlink(tempLocalFilename, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })
    .then(() => {
      for (let index = 0; index < Math.pow(amountOfTiles, 2); index++) {
        console.log(
          `Sliced image has been uploaded to tiles/${baseFileName}_${index}${baseFileExtension}.`
        );

        // Delete the temporary file.
        // return new Promise((resolve, reject) => {
        console.log(
          `Deleting file ${tempLocalFilenameNoExt}_${index}${baseFileExtension}.`
        );
        fs.unlink(
          `${tempLocalFilenameNoExt}_${index}${baseFileExtension}`,
          err => {
            if (err) {
              reject(err);
            }
          }
        );
      }
      return Promise.resolve;
      // );
    });
}
