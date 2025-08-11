import {Request, Response} from "express";
import {LibService} from "../services/libService.js";
import {libServiceEmbedded, LibServiceImplEmbedded} from "../services/libServiceImplEmbedded.js";
import {Book, BookDto} from "../model/Book.js";
import {convertBookDtoToBook, getGenre} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";

// const libService = new LibServiceImplEmbedded();

export const getAllBooks = (req:Request,res:Response)=>{
    const  result = libServiceEmbedded.getAllBooks();
    res.json(result);
}

export const  addBook = (req:Request,res:Response)=>{
    const dto = req.body as BookDto;
    const  book:Book = convertBookDtoToBook(dto);
    const result = libServiceEmbedded.addBook(book);
    if(result){
        res.status(201).json(book)
    }else{
        throw new HttpError(409, 'Book not added. Id conflict.');
    }
}

export const getBooksByGenre = (req:Request,res:Response)=>{
    const {genre} = req.query;
    const isGenre = getGenre(genre as string)
    const result = libServiceEmbedded.getBooksByGenre(isGenre)
    res.json(result)

}


