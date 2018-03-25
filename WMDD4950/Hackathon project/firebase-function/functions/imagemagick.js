"use strict";

const exec = require("child_process").exec;
const path = require("path");
/**
 * Slice an image file into a given grid size.
 *
 * @param {!file} event the image file to be sliced.
 * @param {!gridSize} Number Size of the grid to be created.
 */
// Slice the given file using ImageMagick.
exports.slice = (file, gridSize) => {
  // const tempLocalFilename = path.parse(file.name).base;
  // const tempLocalFilename = path.join(os.tmpdir(), path.parse(file.name).base);
  // const baseFileName = path.basename(
  //   path.parse(file.name).base,
  //   path.extname(file.name)
  // );
  // const tempLocalFilenameNoExt = path.join(os.tmpdir(), baseFileName);
  // const baseFileExtension = path.extname(file.name);

      // Slice the image using ImageMagick.
  return new Promise((resolve, reject) => {
    exec(
      `convert ${file} -crop ${gridSize}x${gridSize}@ +repage  +adjoin ${tempLocalFilenameNoExt}_%d${baseFileExtension}`,
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
      // }
    // );
    // })
    .then(() => {
      for (let index = 0; index < Math.pow(gridSize, 2); index++) {
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
      for (let index = 0; index < Math.pow(gridSize, 2); index++) {
        console.log(
          `Sliced image has been uploaded to tiles/${baseFileName}_${index}${baseFileExtension}.`
        );
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
      return resolve();
      // );
    })
    .catch(err => {
      reject(err);
    });
  })
}