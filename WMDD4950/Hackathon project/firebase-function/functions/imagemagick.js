"use strict";

const exec = require("child_process").exec;
const path = require("path");
/**
 * Slice the given file using ImageMagick.
 *
 * @param {!file} event the image file to be sliced.
 * @param {!gridSize} Number Size of the grid to be created.
 */
exports.slice = (file, gridSize) => {
  console.log(`Function Slice started with arguments ${arguments}`)
  const outputFiles = [];
  return new Promise((resolve, reject) => {
    exec(
      `convert ${file} -crop ${gridSize}x${gridSize}@ +repage  +adjoin ${path.parse(file).dir}/${path.parse(file).name}_%d${path.parse(file).ext}`,
      { stdio: "ignore" },
      (err, stdout) => {
        if (err) {
          console.error("Failed to slice image.", err);
          reject(err);
        } else {
          resolve(stdout);
        }
      }
    )
  })
    .then(() => {
      for (let index = 0; index < Math.pow(gridSize, 2); index++) {
        outputFiles.push(`${path.parse(file).dir}/${path.parse(file).name}_${index}${path.parse(file).ext}`)
        // console.log(
          //   `Uploading tiles ${tempLocalFilenameNoExt}_${index}${baseFileExtension}`
          // );
        }
        return Promise.resolve(outputFiles)
      })
      .catch(err => {
        throw(err);
      });
      // return outputFiles
}