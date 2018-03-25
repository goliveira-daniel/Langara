'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const os = require('os');
const path = require('path');
// const storage = require('@google-cloud/storage')();

/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!file} event the image file to be sliced.
 * @param {!amountOfTiles} Number of Tiles to be created.
 */
// Slice the given file using ImageMagick.
exports.sliceImage = ((file, amountOfTiles) => {
  // const tempLocalFilename = path.parse(file.name).base;
  const tempLocalFilename = path.join(os.tmpdir(), path.parse(file.name).base);
  const tempLocalDir = path.dirname(tempLocalFilename);
  const baseFileName = path.basename(path.parse(file.name).base, path.extname(file.name));
  const tempLocalFilenameNoExt = path.join(os.tmpdir(), baseFileName);
  const baseFileExtension = path.extname(file.name);

  // Download file from bucket.
  console.info(`Trying to download ${tempLocalFilename}`)
  return file.download({ destination: tempLocalFilename })
    .catch((err) => {
      console.error('Failed to download file.', err);
      return Promise.reject(err);
    })
    .then(() => {
      console.log(`Image ${path.parse(file.name).base} has been downloaded to ${tempLocalDir}.`);

      // Slice the image using ImageMagick.
      return new Promise((resolve, reject) => {
        exec(`convert ${tempLocalFilename} -crop ${amountOfTiles}x${amountOfTiles}@ +repage  +adjoin ${tempLocalFilenameNoExt}_%d${baseFileExtension}`, { stdio: 'ignore' }, (err, stdout) => {
          if (err) {
            console.error('Failed to slice image.', err);
            reject(err);
          } else {
            resolve(stdout);
          }
        });
      });
    })
    .then(() => {
        for (let index = 0; index < Math.pow(amountOfTiles,2); index++) {
          // const element = array[index];
          
          console.log(`Uploading tiles ${tempLocalFilenameNoExt}_${index}${baseFileExtension}`);
          
          // Upload the Sliced image back into the bucket.
          file.bucket.upload(`${tempLocalFilenameNoExt}_${index}${baseFileExtension}`, { destination: `tiles/${baseFileName}_${index}${baseFileExtension}` })
          .catch((err) => {
            console.error('Failed to upload slice image.', err);
            return Promise.reject(err);
          });
        }
        return Promise.resolve
      })
    .then(() => {
        console.log(`Deleting file ${tempLocalFilename}.`);

        // Delete the temporary file.
        return new Promise((resolve, reject) => {
          fs.unlink(tempLocalFilename, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
    })
    .then(() => {
      for (let index = 0; index < Math.pow(amountOfTiles,2); index++) {
        console.log(`Sliced image has been uploaded to tiles/${baseFileName}_${index}${baseFileExtension}.`);
        
        // Delete the temporary file.
        // return new Promise((resolve, reject) => {
          console.log(`Deleting file ${tempLocalFilenameNoExt}_${index}${baseFileExtension}.`);
          fs.unlink(`${tempLocalFilenameNoExt}_${index}${baseFileExtension}`, (err) => {
            if (err) {
              reject(err);
            }
          });
        }
        return Promise.resolve
    // );
      }
    );
})