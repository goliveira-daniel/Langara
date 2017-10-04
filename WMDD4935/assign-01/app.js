// const http = require('http')
const fs = require('fs')

const folders = {
    posts: './posts',
    templates: './templates',
    build: './build'
}
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
    // let arrFiles = '<ul>'
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
    let li = ''
    fs.readdirSync(dir).forEach(file => {li += '<li>' + file + '</li>'})
    // arrFiles += li
    return '<ul>' + li + '</ul>'
}
let dataToWrite = fs.readFileSync('./templates/index_h.html', 'utf8') + getPostsList(folders.posts) + fs.readFileSync('./templates/index_f.html', 'utf8')

fs.writeFile(folders.build + '/index.html', dataToWrite.trim(), 'utf8', (err) => {
    if (err) console.log(err)
    console.log('File (re-)created')
})

console.log(`Watching for new posts at ${folders.posts}. Press CTRL + C to stop the watcher and finish execution.`)
fs.watch(folders.posts,'utf8', (event, file) => {
    if (file) {
        console.log(`File ${file} changed. Generating new index.html...`);
        fs.writeFile(folders.build + '/index.html', dataToWrite.trim(), 'utf8', (err) => {
            if (err) console.log(err)
            console.log(`File ${file} (re-)created`)
        })
        // Prints: <Buffer ...>
    }
})