import { getBookById } from "../api/books.js";
import { fetchCheckoutSession, fetchConfig } from "../api/stripe.js";
import debounce from "../utils/debounce.js";
import { isRequired, isNumeric, isBetween } from "../utils/form-validation.js";

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

export default async function (bookId) {
  const usernameEl = document.querySelector("#username");
  const phoneEl = document.querySelector("#phone");
  const form = document.querySelector("#checkout");

  const stripePublicKey = await fetchConfig();
  const loadedStripe = Stripe(stripePublicKey);
  console.log(stripePublicKey, loadedStripe, "stripes");

  const checkUsername = () => {
    let valid = false;

    const min = 3;
    const max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEl, "Username cannot be blank.");
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        `Username must be between ${min} and ${max} characters.`
      );
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkPhone = () => {
    let valid = false;

    const phone = phoneEl.value.trim();

    if (!isRequired(phone)) {
      showError(phoneEl, "phone cannot be blank.");
    } else if (!isNumeric(phone)) {
      showError(phoneEl, "phone must be number");
    } else {
      showSuccess(phoneEl);
      valid = true;
    }

    return valid;
  };

  const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove("success");
    formField.classList.add("error");

    // show the error message
    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove("error");
    formField.classList.add("success");

    // hide the error message
    const error = formField.querySelector("small");
    error.textContent = "";
  };

  form.addEventListener("submit", async function (e) {
    // prevent the form from submitting
    e.preventDefault();
    const orderQuantity = 1;

    // validate fields
    let isUsernameValid = checkUsername();
    let isPhoneValid = checkPhone();

    let isFormValid = isUsernameValid && isPhoneValid;
    // submit to the server if the form is valid
    if (isFormValid) {
      // set loading here
      const sessionId = await fetchCheckoutSession({
        quantity: orderQuantity,
        bookId,
      });
      // When the customer clicks on the button, redirect them to Checkout.
      const { error } = await loadedStripe.redirectToCheckout({
        sessionId,
      });
      if (error) {
        // loading false
        // error display using `error.message`.
      }
    }
  });

  form.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "username":
          checkUsername();
          break;
        case "phone":
          checkPhone();
          break;
      }
    })
  );

  bookDetail(bookId);
}
