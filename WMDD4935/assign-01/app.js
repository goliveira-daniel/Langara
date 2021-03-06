const fs = require('fs')
var md = require('markdown-it')();
// var result = md.render('# markdown-it rulezz!');

const folders = {
    posts: './posts',
    templates: './templates',
    build: './build'
}
getPostsText(folders.posts);
writeFile('index.html', dataToWrite(getPostsNames(folders.posts)));

console.log(`Watching for new posts at ${folders.posts}. Press CTRL + C to stop the watcher and finish execution.`)

fs.watch(folders.posts,'utf8', (event, file) => {
    if (file) {
        console.log(`File ${file} changed. Generating new index.html...`);
        writeFile('index.html', dataToWrite(getPostsNames(folders.posts)))
        getPostsText(folders.posts);
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
                writeFile(`${file}.html`, dataToWrite(md.render(data)))
                // console.log(data)
            })
        })
    })
}

function dataToWrite(text) {
    return fs.readFileSync(folders.templates + '/index_h.html', 'utf8') + text + fs.readFileSync(folders.templates + '/index_f.html', 'utf8')
}

function writeFile(file, text) {
    fs.writeFile(folders.build + '/' + file, text, 'utf8', (err) => {
        if(err) console.log(err);
        console.log('File (re-)created');
    });
}