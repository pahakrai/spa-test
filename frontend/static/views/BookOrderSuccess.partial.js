async function getBookById(bookId) {
  const response = await fetch(`/api/books/${bookId}`);
  const data = await response.json();
  console.log(data, "book here");
  return data;
}

async function getStripeSessionBySessionId(sessionId) {
  const response = await fetch(
    `/api/orders/checkout-session?sessionId=${sessionId}`
  );
  const data = await response.json();
  console.log(data, "session here");
  return data;
}

async function bookDetail(bookId) {
  const mainWrapper = document.getElementById("book-info");
  const book = await getBookById(bookId);
  const bookElement = document.createElement("div");
  bookElement.innerHTML = `
        <div class="book-info"> 
          <div class="img-book">
            <img
              src=${
                book.thumbnailUrl
                  ? book.thumbnailUrl
                  : "/static/no-image-icon.png"
              }
              alt=""
            />
          </div>
          <p class="book-body">
          ${book.title}
          </p>
          <p class="book-body">
          $${book.price}
          </p>
        </div>
      `;
  mainWrapper.appendChild(bookElement);
}

async function stripeSession(sessionId) {
  const mainWrapper = document.getElementById("session-info");
  const session = await getStripeSessionBySessionId(sessionId);
  const bookElement = document.createElement("div");
  bookElement.innerHTML = `
        <p class="session-detail"> 
          <p>
          ${JSON.stringify(session)}
          </p>
        </div>
      `;
  mainWrapper.appendChild(bookElement);
}

export default (bookId, sessionId) => {
  bookDetail(bookId);
  stripeSession(sessionId);
};
