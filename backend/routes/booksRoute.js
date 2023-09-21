import express from 'express'
import { Book } from '../models/bookModel.js';

// insted of "app" we can use this "router"
const router = express.Router()

// Http Route to<----------- Save a new Book ------------> type of post -> new resource
// first paramter is "string" -> for "route"
// second paramter is "callback ()=>{}" -> request and response
// working with mongoose is asyncronous process --> process/func exectues in background --> without having user to wait for the task to finish
// use try -> catch when async 
// Standard HTTP method ------> POST
router.post('/', async (request, response) => {
    try {
        // validation for input -> coming from request.body
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // 400 --> bad request by client -> server cannot process it.
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }
        // now if validation passes, let's create 
        // variable for new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        // save the result to a "book" variable
        // send the "newBook" by Book.create()
        const book = await Book.create(newBook)

        // send the book to the client
        // 201 --> request fulfilled and new resource created,
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

});




// Route to <-------get "All BOOKS'S"------> from database
// this is "get" route
// async callback function to handle +==> "request"
router.get('/', async (request, response) => {
    try {
        // use Book.find({}) --> to get all books from databse
        const books = await Book.find({})

        // return response of 200 & send books ---> client 
        // create a better ---> strucute with ---> object { count: ...., data: ....}
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        // 500 --> internal server error
        response.status(500).send({ message: error.message })
    }
})




// Route to <-----------get "ONE BOOK" ------> from database with "ID"
// to tag a prameter in route, we use: books/:id
// we need :id ---> to search "Database"
// Standard HTTP method ----------> GET
router.get('/:id', async (request, response) => {
    try {
        // let's destructe it from "request.params"
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book)

    } catch (error) {
        console.log(error.message)
    }
})





// Route to <----------update ------->  a "BOOK"
//  to update --> need both "request.params" and "request.body"
// request.param ---> when you want to extract data from "URL" ex: /books/:id
// request.body --> when you want to access the body of a web request & retrive data sent by the client
// WE Use "put" method to update a resource
// Standard HTTP method --------> PUT
router.put('/:id', async (request, response) => {
    try {
        // let's validate
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // If any of the above field is missing then ,
            // 400 ---> Bad Request by Clinet, Server cannot handle 
            return response.status(400).send({
                message: "Send all required filed: author, title, publishYear"
            })
        }
        // after validation

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body)

        // if result is "false"
        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        // else
        return response.status(200).send({ message: "Book updated sucessfully" })

    } catch (error) {
        console.log(error.message)
        // 500 -----> Internal Server Error
        response.status(500).send({ message: error.message })
    }
})



// Route for<-------------- Delete a book ------------->
// add we nned is Id
// standard HTTP method --------> DELETE
router.delete('/:id', async (request, response) => {
    try {
        // id structure from id.param
        const { id } = request.params

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'Book deleted Successfully' })

    } catch (error) {
        console.log(error.message)
        // 500 Internal Server Error
        response.status(500).send({ message: error.message })
    }

})

// export router as default router;

export default router;

