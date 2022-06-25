import express from "express";
import { getBook, getBooks } from "../helpers/books.js";

const router = express.Router();

/* APIs 
   - GET     /api/books             // List Books
   - GET     /api/books/:bookId     // Retrieve a book
*/

router.route("/").get(getBooks);

router.route("/:bookId").get(getBook);

export { router as bookRouter };
