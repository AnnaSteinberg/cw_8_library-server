// import {LibService} from "./libService.js";
// import {Book, BookGenres, BookStatus} from "../model/Book.js";
// import {BookMongooseModel} from "../model/BookMongooseModel.js";
// import {HttpError} from "../errorHandler/HttpError.js";
//
//
// export class LibServiceImplMongo implements LibService{
//     async addBook(book: Book): Promise<boolean> {
//         const isExists = await BookMongooseModel.findById(book.id).exec();
//         if(isExists){
//             return Promise.resolve(false)
//         }
//         const newBook = new BookMongooseModel(book);
//         await newBook.save()
//
//         // const  temp = await BookMongooseModel.create({
//         //     _id: book.id,
//         //     title: book.title,
//         //     author: book.author,
//         //     genre: book.genre,
//         //     status: book.status,
//         //     pickList:book.pickList
//         // })
//         // if(!temp)return Promise.resolve(false);
//
//         return Promise.resolve(true);
//     }
//
//     async getAllBooks(): Promise<Book[]> {
//         const result = await BookMongooseModel.find().exec() as Book[];
//         return Promise.resolve(result);
//     }
//
//     async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
//         const result = await BookMongooseModel.find({genre}).exec() as Book[];
//         return Promise.resolve(result);
//     }
//
//     async pickUpBook(id: string, reader: string): Promise<void> {
//         const book = await BookMongooseModel.findById(id).exec()
//         if(!book){
//             throw new HttpError(404, `Book with ${id} not found`)
//         }
//         if(book.status !==BookStatus.ON_STOCK)
//             throw new HttpError(404, `Book with ${id} on hand`)
//         book.status = BookStatus.ON_HAND;
//         book.pickList.push({reader, pick_date:new Date().toDateString(),return_date:null})
//
//         book.save()
//     }
//
//     async removeBook(id: string): Promise<Book> {
//         const result = await BookMongooseModel.find().exec()
//         return Promise.resolve(result[0] as Book);
//     }
//
//     async returnBook(id: string): Promise<void> {
//         const book = await BookMongooseModel.findById(id).exec()
//         if (!book) {
//             throw new HttpError(404, `Book with ${id} not found`)
//         }
//         if (book.status !== BookStatus.ON_STOCK)
//             throw new HttpError(404, `Book with ${id} on stock`)
//
//         book.status = BookStatus.ON_STOCK;
//         const temp = book.pickList[book.pickList.length - 1];
//         temp.return_date = new Date().toDateString();
//
//         book.save()
//     }
//
// }
//
// export const libServiceMongo = new LibServiceImplMongo();