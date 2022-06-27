import express from "express";
import { getBook, getBooks } from "../helpers/books.js";

const router = express.Router();

/* APIs 
   - GET     /api/books             // List Books
   - GET     /api/books/:bookId     // Retrieve a book
*/

router.get("/", getBooks);

router.get("/:bookId", getBook);

export { router as bookRouter };
