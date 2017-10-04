const fs = require('fs')

const folders = {
    posts: './posts',
    templates: './templates',
    build: './build'
}
getPostsText(folders.posts);
writeFile('index.html', dataToWrite());

console.log(`Watching for new posts at ${folders.posts}. Press CTRL + C to stop the watcher and finish execution.`)

fs.watch(folders.posts,'utf8', (event, file) => {
    if (file) {
        console.log(`File ${file} changed. Generating new index.html...`);
        writeFile('index.html', dataToWrite())
    }
})

function getPostsNames(dir) {
    let li = ''
    fs.readdirSync(dir).forEach(file => {li += '<li>' + file + '</li>'})
    return '<ul>' + li + '</ul>'
}

function getPostsText(dir) {
    // fs.readdir returns an array of files in the directory
    fs.readdir(dir, (err, files) => {
        if (err) console.log(err)
        // use forEach() to loop over the files
        files.forEach((file) => {
            // read the files, we need to provide the directory again as the array only contains file names
            fs.readFile(`${dir}/${file}`, 'utf8', (err, data) => {
                console.log(data)
            })
        })
    })
}

function dataToWrite() {
    return fs.readFileSync(folders.templates + '/index_h.html', 'utf8') + getPostsNames(folders.posts) + fs.readFileSync(folders.templates + '/index_f.html', 'utf8')
}

function writeFile(file, text) {
    fs.writeFile(folders.build + '/' + file, text, 'utf8', (err) => {
        if(err) console.log(err);
        console.log('File (re-)created');
    });
}