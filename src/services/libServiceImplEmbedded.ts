import {LibService} from "./libService.ts";
import {Book, BookGenres} from "../model/Book.ts";

export class LibServiceImplEmbedded implements LibService{
    private books:Book[] = [];
    async addBook(book: Book): Promise<boolean> {
        const index = this.books.findIndex(item => item.id === book.id);
        if(index === -1 ){
            this.books.push(book)
            return new Promise(resolve => resolve(true))
        }
        return Promise.resolve(false);
    }

   async getAllBooks(): Promise<Book[]> {
        return Promise.resolve([...this.books]);
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        return this.books.filter(item => item.genre === genre);
    }

    async pickUpBook(id: string, reader: string): Promise<void> {
    }

    async removeBook(id: string): Promise<Book> {
        throw 'to do';
    }

    async returnBook(id: string): Promise<void> {
    }

}

export const libServiceEmbedded = new LibServiceImplEmbedded();