import BookOrderPartial from "./BookOrder.partial.js";
import MainView from "./View.js";

export default class extends MainView {
  constructor(params) {
    super(params);
    this.bookId = params.id;
    this.setTitle("Book Order");
  }

  async loadPartialJS() {
    await BookOrderPartial(this.bookId);
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>Book</h1>
        <div id="book-info">
        </div>
        <form id="checkout" class="form">
            <h1>Check Out Order</h1>
            <div class="form-field">
                <label for="username">Customer Name:</label>
                <input type="text" name="username" id="username" autocomplete="off">
                <small></small>
            </div>
            <div class="form-field">
                <label for="phone">Phone:</label>
                <input type="text" name="phone" id="phone" autocomplete="off">
                <small></small>
            </div>
            <div class="form-field">
                <input type="submit" value="Pay" class="btn">
            </div>
        </form>
      </div> 
        `;
  }
}
