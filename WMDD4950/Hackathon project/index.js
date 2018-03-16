'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const os = require('os');
const path = require('path');
const storage = require('@google-cloud/storage')();

/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
exports.processImage = (event, callback) => {
  console.log('Processing file: ' + event.data.name);
  const object = event.data;

  // Exit if this is a deletion or a deploy event.
  if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  } else if (!object.name) {
    console.log('This is a deploy event.');
    return;
  }

  // Exit if this is triggered on a file that is not on images folder.
  if (path.parse(object.name).dir == 'tiles') {
    console.warn('This is not on images folder.');
    return null;
  }
  
  const file = storage.bucket(object.bucket).file(object.name);

  console.log(`CHECK THIS OUT: ${JSON.stringify(object.name)}.`);
  console.log(`Slicing ${file.name}.`);
  return sliceImage(file);


//  callback();
};

// Slice the given file using ImageMagick.
function sliceImage (file) {
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
        exec(`convert ${tempLocalFilename} -crop 4x4@ +repage  +adjoin ${tempLocalFilenameNoExt}_%d${baseFileExtension}`, { stdio: 'ignore' }, (err, stdout) => {
          if (err) {
            console.error('Failed to slice image.', err);
            reject(err);
          } else {
            resolve(stdout);
          }
        });
      });
    })
    // FUCKING IMPORTANT --->>> IT'S NOT NECESSARY TO UPLOAD THE ORIGINAL FILE BACK TO ITS FOLDER, JUST SKIP THIS PART
    // .then(() => {
    //   console.log(`Image ${path.parse(file.name).base} has been sliced.`);

    //   // Upload the Sliced image back into the bucket.
    //   return file.bucket.upload(tempLocalFilename, { destination: file.name })
    //     .catch((err) => {
    //       console.error('Failed to upload slice image.', err);
    //       return Promise.reject(err);
    //     });
    // })
    .then(() => {
      console.log(`Uploading tiles ${tempLocalFilenameNoExt}_1${baseFileExtension}`);

      // Upload the Sliced image back into the bucket.
      return file.bucket.upload(`${tempLocalFilenameNoExt}_1${baseFileExtension}`, { destination: `tiles/${baseFileName}_1${baseFileExtension}` })
        .catch((err) => {
          console.error('Failed to upload slice image.', err);
          return Promise.reject(err);
        });
    })
    .then(() => {
      console.log(`Sliced image has been uploaded to tiles/${baseFileName}_1${baseFileExtension}.`);

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
    });
}