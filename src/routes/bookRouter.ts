
import express from "express";
import {BookController} from "../controllers/BookController.js";
import * as controller from "../controllers/bookControllerFunc.js";
import {bodyValidation} from "../validation/bodyValidation.js";
import {BookDtoSchema} from "../validation/joiSchemas.js";

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
bookRouter.post('/',  bodyValidation(BookDtoSchema), controller.addBook);
bookRouter.delete('/',controller.removeBook);

bookRouter.get('/genre',  controller.getBooksByGenre);
bookRouter.patch('/pickup', controller.pickUpBook);
// bookRouter.get('/genre_status')