import {LibService} from "./libService.js";
import {Book, BookGenres, ReaderLib} from "../model/Book.js";
import {pool} from "../config/libConfig.js";
import {ResultSetHeader} from 'mysql2'


export class LibServiceImplSQL implements LibService {
    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status]);
        if (!result) return Promise.resolve(false);

        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const [rows] = await pool.query('SELECT * FROM books WHERE status NOT IN (?)', 'removed');
        return rows as Book[];
    }


    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const [rows] = await pool.query('SELECT * FROM books WHERE genre = ?', [genre]);
        return rows as Book[];
    }

    async pickUpBook(id: string, reader: ReaderLib): Promise<void> {
        const [rows] = await pool.query('SELECT reader_id FROM readers WHERE email = ?', [reader.email]);
        const typedRows = rows as { reader_id: number }[];

        let readerID:number;
        if (typedRows.length > 0) {
            readerID = (rows as { reader_id: number }[])[0].reader_id;
            console.log(readerID);
        }
        else{const [result] = await pool.query('INSERT INTO readers(name, email, phone) VALUES(?,?,?)',
            [reader.name, reader.email, reader.phone || 'no phone']);
            if (!result) {
                throw new Error('!Failed to create new user!')
            }
            readerID = (result as ResultSetHeader).insertId;
            console.log('Новый reader_id:', readerID);

        }


        await pool.query('UPDATE books_readers SET reader_id = ? WHERE book_id = ?', [readerID, id])
        await pool.query('UPDATE books SET status = ? WHERE id = ?', ['on_hand', id]);

        console.log(`The book picked`)
    }

    async removeBook(id: string): Promise<Book> {
        let rows = await pool.query('SELECT * FROM books WHERE id=?', [id]);
        if (rows.length <= 0) return {} as Book;
        // const [result] = await pool.query<ResultSetHeader >('DELETE FROM books WHERE id = ?', [id]);
        // if (result.affectedRows === 0) {
        //     throw new Error("!!Deletion failed - the book was not deleted!!");
        // }
        await pool.query('UPDATE books SET status = ? WHERE id = ?', ['removed', id]);
        rows = await pool.query('SELECT * FROM books WHERE id=?', [id]);
        return (rows[0] as Book[])[0];


    }

    returnBook(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const libServiceSql = new LibServiceImplSQL();