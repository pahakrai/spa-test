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
            <h1>Books</h1>
            <p>You are viewing the Books!</p>
        `;
  }
}
