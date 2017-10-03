// const http = require('http')
const fs = require('fs')

// http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/html'})
//         fs.readFile('./static/index.html', 'utf8', (err, data) => {
//             if (err) console.error(err)
//             res.end(data)
//             })
//     }
// }).listen(3000)

function getPostsList(dir) {
    let arrFiles = '<ul>'
    // fs.readdir returns an array of files in the directory
    // arrFiles += fs.readdir(dir, (err, files) => {
    //     if (err) console.log(err)
    //     let innerStr = ''
    //     // use forEach() to loop over the files
    //     files.forEach((file) => {
    //         innerStr += '<li>' + file + '</li>'
    //     })
    //         // read the files, we need to provide the directory again as the array only contains file names
    //         // fs.readFile(`${dir}/${file}`, 'utf8', (err, data) => {
    //             // console.log(file)
    //         // })
    //     return innerStr
    // })
    let str = ''
    fs.readdirSync(dir).forEach(file => {str += '<li>' + file + '</li>'})
    arrFiles += str + '</ul>'
    return arrFiles
}
let dataToWrite = fs.readFileSync('./templates/index_h.html', 'utf8') + getPostsList('./posts') + fs.readFileSync('./templates/index_f.html', 'utf8')

fs.writeFile('./build/index.html', dataToWrite.trim(), 'utf8', (err) => {
    if (err) console.log(err)
    console.log('file created')
})