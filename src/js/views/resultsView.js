import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No results found for your query , Please try again :)";

  _generateMarkup() {
    return this._data.map(this._generatePreview).join("");
  }

  _generatePreview(result) {
    // For Adding the active class.
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          id === result.id ? "preview__link--active" : ""
        }" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" crossorigin/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
