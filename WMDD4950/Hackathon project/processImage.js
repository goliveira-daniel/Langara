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

  // Exit if this is triggered on a file that is not an image.
  if (!object.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }
  
  const file = storage.bucket(object.bucket).file(object.name);

  console.log(`Analyzing ${file.name}.`);
  return sliceImage(file);
//  callback();
};

// Slice the given file using ImageMagick.
function sliceImage (file) {
  // const tempLocalFilename = `/tmp/${path.parse(file.name).base}`;
  const tempLocalFilename = path.join(os.tmpdir(), file.name);
  const tempLocalDir = path.dirname(tempLocalFile);
  const baseFileName = path.basename(file.name, path.extname(file.name));
  const tempLocalFilenameNoExt = path.join(os.tmpdir(), baseFileName);
  const baseFileExtension = path.extname(file.name);

  // Download file from bucket.
  return file.download({ destination: tempLocalDir })
    .catch((err) => {
      console.error('Failed to download file.', err);
      return Promise.reject(err);
    })
    .then(() => {
      console.log(`Image ${file.name} has been downloaded to ${tempLocalDir}.`);

      // Slice the image using ImageMagick.
      return new Promise((resolve, reject) => {
        exec(`convert ${tempLocalFilename} -crop 4x4@ +repage  +adjoin ${tempLocalFilenameNoExt}@_%d${baseFileExtension}`, { stdio: 'ignore' }, (err, stdout) => {
          if (err) {
            console.error('Failed to slice image.', err);
            reject(err);
          } else {
            console.log(stdout);
            resolve(stdout);
          }
        });
      });
    })
    .then(() => {
      console.log(`Image ${file.name} has been sliced.`);

      // Upload the Sliced image back into the bucket.
      return file.bucket.upload(tempLocalFilename, { destination: file.name })
        .catch((err) => {
          console.error('Failed to upload slice image.', err);
          return Promise.reject(err);
        });
    })
    .then(() => {
      console.log(`Image ${file.name} has been sliced.`);

      // Upload the Sliced image back into the bucket.
      return file.bucket.upload(`${tempLocalFilenameNoExt}_1${baseFileExtension}`, { destination: 'test.jpg' })
        .catch((err) => {
          console.error('Failed to upload slice image.', err);
          return Promise.reject(err);
        });
    })
    .then(() => {
      console.log(`Sliced image has been uploaded to ${'test.jpg'}.`);

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