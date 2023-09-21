import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
// require ('dotenv').config()

const app = express();

// Middleware for parsign request body
app.use(express.json())

// Middleware for parsing request body =====> cors
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors())
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         // object in "cors"
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )


//<---------- http route ------------>
// first parameter is "string" for route
// second parameter is "callback function" to handle the request
// in callback function we receive "request" & "response"
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To MERN Stack Vikas')
})


// <----- Middleware for "/" books ----> 
app.use('/books', booksRoute)








// conect to Database
mongoose
    .connect(mongoDBURL)
    // .then & .catch structure 
    .then(() => {
        console.log("APp Connected Successfully to the database!");

        // run express server Only if connected to databse
        app.listen(PORT, () => {
            console.log(`App is listening to port: {PORT}`)
        })

    })
    .catch((error) => {
        console.log(error)
    })