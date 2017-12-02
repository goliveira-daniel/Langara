const firebase = require("firebase");
// const monk = require('monk')
require('dotenv').config()

var config = {
    apiKey: "AIzaSyC6G4GDPiFqrueps0u6NrFIZ68P1J_mfIg",
    authDomain: "wmdd4935-2c2bd.firebaseapp.com",
    databaseURL: "https://wmdd4935-2c2bd.firebaseio.com",
    projectId: "wmdd4935-2c2bd",
    storageBucket: "wmdd4935-2c2bd.appspot.com",
    messagingSenderId: "166838085898"
}

firebase.initializeApp(config);

// get the DBURL value 
// const db = monk(process.env.DBURL)
// get or create a collection in mongo
// const books = db.get('books')

module.exports = [
{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        return reply('a simple book list example, /books')
    }
},
{
    method: 'GET',
    path: '/books',
    handler: (request, reply) => {
        firebase.database().ref('books/').on('value', function(data) {
            return reply(data.val())
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
        });
        // return reply(allBooks) 
    }
},
{
    method: 'GET',
    path: '/books/{bookID}',
    handler: (request, reply) => {
        let book = firebase.database().ref('books/' + request.params.bookID)
        book.on('value', function (data) {
            return reply(data)
        })
        // let book = books.find({_id: Number(request.params.bookID)})
    }
},
    {
    method: 'GET',
    path: '/books/{genre*}',
    handler: queryName
}
]

function queryName (request, reply) {
    if (request.query.genre) {
        let booksMatched = []
        let books = firebase.database().ref('books/')
        books.on('value', function (snapshot) {
            // console.log(snapshot)
            snapshot.forEach(child => {
                console.log(request.query.genre)
                if (child.val().genre == request.query.genre) {
                    booksMatched.push(child.val())
                }
            });
            if (booksMatched.length > 0) {
                return reply (booksMatched)
            } else {
                return reply ('no book by this genre').code(404)
            }
        })
    // let book = books.find({name: request.query.name})
    // if (Object.keys(book).length !== 0) {
    //     return reply(book)
    // }
}
return reply ('query not recognized. try searching by name').code(404)
}