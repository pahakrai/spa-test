import { getBookById } from "../api/books.js";
import { getStripeSessionBySessionId } from "../api/stripe.js";

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
          <p class="book-body price">
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
