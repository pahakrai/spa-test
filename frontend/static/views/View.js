export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  partialJSScriptLoad(filename) {
    // NOTE: Testing Partial js load and Script cleaning
    // await super.loadPartialJS();
    // const newScript = document.createElement("script");
    // newScript.async = true;
    // newScript.src = filename; // eg: "/static/views/BookOrder.partial.js";
    // document.body.appendChild(newScript);
  }

  async loadPartialJS(filename) {
    // // removes all script src than the child loaded script and app.js script
    // const tags = document.getElementsByTagName("script");
    // for (let i = tags.length; i > 0; i--) {
    //   //search backwards within nodelist for matching elements to remove
    //   if (tags[i] && tags[i].getAttribute("src") != null) {
    //     tags[i].parentNode.removeChild(tags[i]);
    //   }
    // }
    // if (filename) {
    //   this.partialJSScriptLoad(filename);
    // }
  }

  async getHtml() {
    return "";
  }
}
