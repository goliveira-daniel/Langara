const fs = require('fs')
const path = require('path')

module.exports = function(directory, filter, callback) {
    fs.readdir(directory, function(error, list) {
        if (error) {
            return callback(error);
        }
        let filtered = listOfFiles(list, filter);
        return callback(null, filtered);
    });
}

// function listOfFiles() {
//     fs.readdir(process.argv[2], (err, files) => {
//         files.forEach(file => {
//             if (path.extname(file) == '.' + process.argv[3])
//                 console.log(file);
//         });
//     });
// }


function listOfFiles(list, filter) {
    return list.filter(function(file) {
        return path.extname(file) == '.' + filter;
    });
};