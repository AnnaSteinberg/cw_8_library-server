
import express from "express";
import {BookController} from "../controllers/BookController.js";
import * as controller from "../controllers/bookControllerFunc.js";

export const bookRouter = express.Router();

// const controller = new BookController();

// bookRouter.get('/', (req:express.Request, res: express.Response) => {
//     controller.getAllBooks(req, res) ;
// })
// bookRouter.post('/', (req:express.Request, res:express.Response)=>{
// console.log(req.body)
// controller.addBook(req, res);
// })


bookRouter.get('/',controller.getAllBooks);
// bookRouter.post('/', bodyValidator(BookDtoJoiSchema), controller.addBook)
bookRouter.post('/',  controller.addBook);
bookRouter.post('/genre',  controller.getBooksByGenre);