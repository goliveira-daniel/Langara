"use strict";

const vision = require("@google-cloud/vision");

/**
 * Returns labels from a given image.
 *
 * @param {!file} string path to image to detect labels.
 */
exports.labelDetection = file => {
    console.log(`Function Vision started with arguments ${file}`)
    let labels = [];
    const client = new vision.ImageAnnotatorClient();
    return new Promise((resolve, reject)  => {
        client.labelDetection(file)
        .then(results => {
            console.log(results)
            labels = results[0].labelAnnotations;
            // console.log("Labels:");
            // labels.forEach(label => console.log(label.description));
            return resolve(labels);
        })
        .catch(err => {
            console.error("ERROR:", err);
            throw(err)
        });
    })
}