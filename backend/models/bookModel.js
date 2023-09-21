import mongoose from "mongoose";

// schema outside for all required fields
// using mongoose schema
const bookSchema =  mongoose.Schema(
    // object of fields
    {
        // object with options
        title: {
            type : String,
            require : true,
        },
        author: {
            type : String,
            require: true,
        },
        publishYear: {
            type: Number,
            require: true,
        },
    },
    // timestamps Object
    {
        timestamps: true,
    }
)


export const Book = mongoose.model('Book', bookSchema);