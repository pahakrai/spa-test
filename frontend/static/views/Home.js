import MainView from "./View.js";
import HomePartial from "./Home.partial.js";
import { navigateTo } from "../app.js";

export default class extends MainView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async loadPartialJS() {
    await super.loadPartialJS();
    HomePartial(navigateTo);
  }

  async getHtml() {
    return `
          <div id="booklist">
            <h1>Books</h1>
            <div class="wrapper" id="main-wrapper"></div>
            <div id="loader">
              <div>...Loading</div>
            </div>
          </div>
        `;
  }
}
