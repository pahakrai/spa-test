import { getBookById } from "../api/books.js";
import { createSessionOrder } from "../api/orders.js";

async function bookDetail(bookId) {
  const mainWrapper = document.getElementById("book-info");
  const book = await getBookById(bookId);
  const bookElement = document.createElement("div");
  bookElement.innerHTML = `
        <div class="book-info"> 
          <div class="img-book">
            <img
              src=${
                book?.thumbnailUrl
                  ? book.thumbnailUrl
                  : "/static/no-image-icon.png"
              }
              alt=""
            />
          </div>
          <p class="book-body">
          ${book?.title}
          </p>
          <p class="book-body price">
          $${book?.price}
          </p>
        </div>
      `;
  mainWrapper.appendChild(bookElement);
}

async function updateSessionOrder(orderModel) {
  const mainWrapper = document.getElementById("session-info");
  const sessionOrder = await createSessionOrder(orderModel);
  if (Boolean(sessionOrder.order?._id)) {
    document.getElementById("order-status").textContent = "Order Created";
  } else {
    document.getElementById("order-status").textContent = "Order Failed";
  }
  const bookElement = document.createElement("div");
  bookElement.innerHTML = `
        <p class="session-detail"> 
          <p>
           Your Order Identification Number is ${sessionOrder.order?._id}
          </p>
        </div>
      `;
  mainWrapper.appendChild(bookElement);
}

export default (bookId, sessionId, username, phone, quantity) => {
  bookDetail(bookId);
  updateSessionOrder({ bookId, sessionId, username, phone, quantity });
};
