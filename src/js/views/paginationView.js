import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;

    if (currPage === 1 && currPage < numPages) {
      return `If we are on page 1 and others are there`;
    }

    if (currPage < numPages) {
      return `If we are in the middle and others are there`;
    }
    // If we are on the last page
    if (currPage === numPages) {
      return `We are on the last page`;
    }

    // If there are no other pages
    return ``;
  }
}
export default new PaginationView();
