import mysql from 'mysql2/promise'
import dotenv from "dotenv";

export  const PORT = 3333;

export const MONGO_URI = 'mongodb+srv://annasteinb:ROSIBjszk42cVQ59@cluster-1.mxktddq.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster-1\n'
dotenv.config()

//======mySQL connection================
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export const SKIP_ROUTES = [
    'POST/accounts'
]
