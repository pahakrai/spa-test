import BookOrderSuccessPartial from "./BookOrderSuccess.partial.js";
import MainView from "./View.js";

export default class extends MainView {
  constructor(params) {
    super(params);
    this.bookId = params.id;
    this.setTitle("Book Order Success");
    var url = new URL(window.location.href);
    this.sessionToken = url.searchParams.get("session_id");
    this.customerName = url.searchParams.get("username");
    this.qty = url.searchParams.get("qty");
    this.customerPhone = url.searchParams.get("phone");
  }

  async loadPartialJS() {
    await BookOrderSuccessPartial(
      this.bookId,
      this.sessionToken,
      this.customerName,
      this.customerPhone,
      this.qty
    );
  }

  async getHtml() {
    return `
      <div class="container">
        <div id="book-info">
        </div>
        <h1 id="order-status">Creating Order...</h1>
        <div id="session-info"><p>You are viewing book session here</p></div>
      </div> 
        `;
  }
}
