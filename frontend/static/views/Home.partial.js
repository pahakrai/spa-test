import { getBooks } from "../api/books.js";
import { getDocumentHeight, getScrollTop } from "../app.js";

export default (navigateTo) => {
  let PAGE_NO = 0;
  let PAGINATION_LIMIT = 20;
  let END_PAGINATE = false;

  async function showBooks(page) {
    const mainWrapper = document.getElementById("main-wrapper");
    const loading = document.getElementById("loader");
    const data = await getBooks(page, PAGINATION_LIMIT);
    if (data.total / PAGINATION_LIMIT <= page) {
      loading.style.display = "none";
      END_PAGINATE = true;
    }
    data.books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("books");
      bookElement.dataset.href = `/book/${book._id}/order`;
      bookElement.setAttribute("data-link", "");
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
      bookElement.onclick = (e) => {
        e.preventDefault();
        navigateTo(`/book/${book._id}/order`);
      };
      mainWrapper.appendChild(bookElement);
    });
  }

  showBooks(++PAGE_NO);

  window.onscroll = function () {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    if (!END_PAGINATE) {
      showBooks(++PAGE_NO);
    }
  };
};
