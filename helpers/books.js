import { Book } from "../models/index.js";

const getBooks = async function (req, res) {
  const PAGINATION_LIMIT = req.query._limit || 20;
  const PAGE_NO = req.query._page || 1;
  const books = await Book.find()
    .skip((PAGE_NO - 1) * PAGINATION_LIMIT)
    .limit(PAGINATION_LIMIT);
  return res.json({ books, total: await Book.find().count() });
};

const getBook = async function (req, res) {
  const book = await getBookById(req.params.bookId);
  return res.json(book);
};

const getBookById = async function (bookId) {
  const book = await Book.findById(bookId);
  return book;
};

export { getBooks, getBook, getBookById };
