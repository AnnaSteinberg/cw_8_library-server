import mysql from 'mysql2/promise'
import dotenv from "dotenv";
import {Roles} from "../utils/libTypes.js";

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
    "POST/accounts", "GET/api/books"
]

/*
USER: getAccById(?), changePass(?), updateAcc(?)
ADMIN: getAccById, updateAcc
! SUPERVISOR: deleteAcc, changeRoles
 */

export const PATH_ROUTES = {
"GET/accounts/reader": [Roles.USER, Roles.ADMIN],
    "PATCH/accounts/password": [Roles.USER],
    "DELETE/accounts": [Roles.SUPERVISOR],
    "PATCH/accounts":[Roles.USER, Roles.ADMIN],
    "PUT/accounts/roles" : [Roles.SUPERVISOR],

}

export  const  CHECK_ID_ROUTES = [
    "GET/accounts/reader", "PATCH/accounts/password", "PATCH/accounts"
]
