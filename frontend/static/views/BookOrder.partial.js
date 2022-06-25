const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

const isNumeric = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

export default function () {
  const usernameEl = document.querySelector("#username");
  const phoneEl = document.querySelector("#phone");
  const form = document.querySelector("#checkout");

  const checkUsername = () => {
    let valid = false;

    const min = 3,
      max = 25;

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

  form.addEventListener("submit", function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername();

    let isFormValid = isUsernameValid;
    // submit to the server if the form is valid
    if (isFormValid) {
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
}
