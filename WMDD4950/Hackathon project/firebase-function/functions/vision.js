"use strict";

const vision = require("@google-cloud/vision");

/**
 * Returns labels from a given image.
 *
 * @param {!file} string path to image to detect labels.
 */
exports.labelDetection = file => {
    const client = new vision.ImageAnnotatorClient();
    client.labelDetection(tempFile)
    .then(results => {
        const labels = results[0].labelAnnotations;
        console.log("Labels:");
        labels.forEach(label => console.log(label.description));
        return labels;
    })
    .catch(err => {
        console.error("ERROR:", err);
        reject()
    });
}