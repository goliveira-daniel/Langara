# Assignment 4

## Partipants
* Daniel Oliveira - 100291515
* Melissa Chiam - 

## Objectives
The goal of this code is to create a book lending API. This service keeps track of a small book lending operation, perhaps for a small, independent library such as one in a museum.

## Important
All endpoints were tested using Postman. There's no client code for this code. 
For the POST test, it's necessary to set the body data for the request as raw, and then select JSON in the dropdown menu, so the data entered in the textbox is correctly parsed to JSON.

## BOOK object
- books - array of objects
    - id - number
    - title - string
    - author - string
    - genre - string
    - publication - object
        - date - date in ISO 8601 format
        - publisher - string
    - copies - array of objects
        - available - boolean
        - edition - number
        - borrower - string
- EXAMPLE:
    - {"id":10,"title":"Extraordinary Stories (Historias extraordinarias)","author":"Andras Worman","genre":"Drama|Mystery","publication":{"date":"1987-05-21","publisher":"Pacocha LLC"},"copies":[{"available":false,"edition":1,"borrower":"wgrimbleby0"},{"available":false,"edition":2,"borrower":"abeswell1"},{"available":true,"edition":3,"borrower":"ddrinkhill2"}]}

## Endpoints
### GET
* /books - return all books in the database
* /books?{queryString} - return all books matching the query strings. The strings permitted are author, title or genre. Only the first string is evaluated, so adding strings as /books?genre=foo&title=bar won't work.
* /books/{id} - return all books matching the id. If no books is found, a null response will be sent.

### DELETE
* /books/{id} - delete the node matching the id. If no book is found, a message is returned.

### POST
* /books/ - Adds a new node in the database. The data to be inserted needs to be sent in the request body as JSON and must match the format of the BOOK object. 

### PUT
* /books/{id} - Updates the node in the database keeping the same ID. The whole object must be sent again.