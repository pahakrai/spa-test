import { getDocumentHeight, getScrollTop } from "../app.js";

async function getBooks(page, limit) {
  const response = await fetch(
    `http://localhost:8080/api/books/?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();
  return data;
}

export default (navigateTo) => {
  const mainWrapper = document.getElementById("main-wrapper");
  const loading = document.getElementById("loader");

  let PAGE_NO = 0;
  let PAGINATION_LIMIT = 20;
  let END_PAGINATE = false;

  async function showBooks(page) {
    const data = await getBooks(page, PAGINATION_LIMIT);
    if (data.total / PAGINATION_LIMIT <= page) {
      loading.style.display = "none";
      END_PAGINATE = true;
    }
    data.books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("albums");
      bookElement.dataset.href = `/book/${book._id}/order`;
      bookElement.setAttribute("data-link", "");
      bookElement.innerHTML = `
        <div class="album-info"> 
          <div class="img-album">
            <img
              src=${
                book.thumbnailUrl
                  ? book.thumbnailUrl
                  : "/static/no-image-icon.png"
              }
              alt=""
            />
          </div>
          <p class="album-body">
          ${book.title}
          </p>
          <p class="album-body">
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
