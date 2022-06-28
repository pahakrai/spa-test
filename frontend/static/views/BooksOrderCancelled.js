import MainView from "./View.js";

export default class extends MainView {
  constructor(params) {
    super(params);
    this.setTitle("Books");
  }

  async loadPartialJS() {
    // super.loadPartialJS(filename);
  }

  async getHtml() {
    return `
            <div class="container">
              <h1>Order</h1>
              <p>Stripe Session Cancelled!</p>
            </div>
        `;
  }
}
