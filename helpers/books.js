import { Book } from "../models/index.js";

const getBooks = async function (req, res) {
  const PAGINATION_LIMIT = req.query._limit || 20;
  const PAGE_NO = req.query._page || 1;
  const books = await Book.find()
    .skip((PAGE_NO - 1) * PAGINATION_LIMIT)
    .limit(PAGINATION_LIMIT);
  return res.json({ books, total: await Book.find().count() });
};

const getBook = function (req, res) {
  const book = Book.findById(req.params.bookId);
  return res.json(book);
};

export { getBooks, getBook };
