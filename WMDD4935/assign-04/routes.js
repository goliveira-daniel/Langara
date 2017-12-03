const firebase = require("firebase");
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
        if (Object.keys(request.query).length !== 0) {
            const validQuery = ["author", "title", "genre"]
            let queryKey = Object.keys(request.query)[0]
            let queryValue = request.query[queryKey]
            console.log(queryValue)
            if (validQuery.indexOf(queryKey) >= 0) {
                let booksMatched = []
                firebase.database().ref('books/').on('value', function(snapshot) {
                    snapshot.forEach(child => {
                        if (child.val()[queryKey].toLowerCase().includes(queryValue.toLowerCase())) {
                            booksMatched.push(child.val())
                        }
                    });
                        if (booksMatched.length > 0) {
                            return reply (booksMatched)
                        } else {
                            return reply ('no book by this query').code(404)
                        }
                    }, function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                        return reply ('Server error').code(404)
                });
            } else {
                return reply ('query not recognized. try searching by book author, title or genre').code(404)
            }
        } else {
            firebase.database().ref('books/').on('value', function(data) {
                return reply(data.val())
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                    return reply ('Server error').code(404)
            });
        }
    }
},
{
    method: 'GET',
    path: '/books/{bookID}',
    handler: (request, reply) => {
        let book = firebase.database().ref('books/' + request.params.bookID)
        book.on('value', function (data) {
            return reply(data)
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            return reply ('Server error').code(404)
        })
        // let book = books.find({_id: Number(request.params.bookID)})
    }
},
{
    method: 'DELETE',
    path: '/books/{bookID}',
    handler: (request, reply) => {
        let ref = firebase.database().ref('books/') 
        ref.on('value', function(snapshot) {
            snapshot.forEach(child => {
                if (child.val().id == request.params.bookID) {
                    ref.child(child.key).remove()
                    .then(function() {
                        console.log("Remove succeeded.")
                        return reply ('Book deleted')
                    })
                }
                return reply ('Book not found')
            })
        })
    }
},
{
    method: 'POST',
    path: '/books',
    handler: (request, reply) => {
        const book = request.payload
        console.log(book)
        firebase.database().ref('books/').push().set(book)
        .then(function() {
            console.log('Synchronization succeeded');
            return reply('Synchronization succeeded');
        })
        .catch(function(error) {
            console.log('Synchronization failed');
            return reply('Synchronization failed');
        });
        // firebase.database().ref('books/').set({
        //     id: book.id,
        //     title: book.title,
        //     author: book.author,
        //     genre: book.genre,
        //     publication: {
        //         date: book.publication.date,
        //         publisher: book.publication.publisher
        //     },
        //     copies: {
        //         available: book.copies.available,
        //         editon: book.copies.edition,
        //         borrower: books.copies.borrower
        //     }
        // });
    }
}
]