async function getBookById(bookId) {
  const response = await fetch(`/api/books/${bookId}`);
  const data = await response.json();
  return data;
}

async function getBooks(page, limit) {
  const response = await fetch(`/api/books/?_limit=${limit}&_page=${page}`);
  const data = await response.json();
  return data;
}

export { getBookById, getBooks };
