# Assignment 4

## Partipants
* Daniel Oliveira - 100291515
* Melissa Chiam - 

## Objectives
The goal of this code is to create a book lending API. This service keeps track of a small book lending operation, perhaps for a small, independent library such as one in a museum.

## Important
All endpoints were tested using Postman. There's no client code for this code. 
For the POST test, it's necessary to set the body data for the request as raw, and then select JSON in the dropdown menu, so the data entered in the textbox is correctly parsed to JSON.

## Endpoints
### GET
* /books - return all books in the database
* /books?<queryString> - return all books matching the query strings. The strings permitted are author, title or genre. Only the first string is evaluated, so adding strings as /books?genre=foo&title=bar won't work.
* /books/<id> - return all books matching the id. If no books is found, a null response will be sent.

### DELETE
* /books/<id> - delete the node matching the id. If no book is founds, a message is returned.

### POST
* /books/ - Adds a new node in the database. The data to be inserted needs to be sent in the request body as JSON and must match the format of the BOOK object. 