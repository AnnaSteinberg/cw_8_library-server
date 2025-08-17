import {Request, Response} from "express";
import {LibService} from "../services/libService.js";
// import {libServiceEmbedded as service, LibServiceImplEmbedded} from "../services/libServiceImplEmbedded.js";
import {Book, BookDto} from "../model/Book.js";
import {convertBookDtoToBook, getGenre} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";
// import {libServiceMongo as service} from "../services/libServiceImplMongo.js";
import {libServiceSql as service} from '../services/libServiceImplSQL.js'

// const libService = new LibServiceImplEmbedded();

export const getAllBooks = async (req: Request, res: Response) => {
    const result = await service.getAllBooks();
    res.json(result);
}

export const  addBook = async (req: Request, res: Response) => {
    const dto = req.body as BookDto;
    const book: Book = convertBookDtoToBook(dto);
    const result = await service.addBook(book);
    if (result) {
        res.status(201).send("Book successfully added")
    } else {
        throw new HttpError(409, 'Book not added. Id conflict.');
    }
}

export const getBooksByGenre = async (req: Request, res: Response) => {
    const {genre} = req.query;
    const isGenre = getGenre(genre as string)
    const result = await service.getBooksByGenre(isGenre)
    res.json(result)

}


