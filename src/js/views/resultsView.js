import previewView from "./previewView";
import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No results found for your query , Please try again :)";

  // This part is difficult , make its notes very nicely and this is also important.

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
