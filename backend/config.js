import dotenv from 'dotenv';
dotenv.config();


// define port here
export const PORT = 5555;

export const mongoDBURL = process.env.MONGODB