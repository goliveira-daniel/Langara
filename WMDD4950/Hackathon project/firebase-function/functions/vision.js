"use strict";

const vision = require("@google-cloud/vision");
const fs = require("fs");
const os = require("os");
const path = require("path");

exports.getLabels = file => {
  //     return vision.labelDetection(file).then(results => {
  //         const labels = results[0].labelAnnotations;

  //         console.log('Labels:');
  //         labels.forEach(label => console.log(label.description));
  //         return labels
  //     })
  //     .catch(err => {
  //         console.error('ERROR:', err);
  //     });
  const tempFile = path.join(os.tmpdir(), path.parse(file.name).base);
  return file
    .download({ destination: tempFile })
    .catch(err => {
      console.error("Failed to download file.", err);
      return Promise.reject(err);
    })
    .then(() => {
      // Performs label detection on the image file
      const client = new vision.ImageAnnotatorClient();
      return client.labelDetection(tempFile)
    })
    .then(results => {
        const labels = results[0].labelAnnotations;
        console.log("Labels:");
        labels.forEach(label => console.log(label.description));
        return labels;
    })
    .catch(err => {
        console.error("ERROR:", err);
    });
    // return Promise.resolve()
    // });
};
