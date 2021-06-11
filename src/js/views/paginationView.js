import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerPagination(handler) {
    // Use event delegation over here
    this._parentElement.addEventListener("click", function (e) {
      const pageBtn = e.target.closest(".btn--inline");

      if (!pageBtn) return;

      const goToPage = +pageBtn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;

    // If we are on the first page and there are others
    if (currPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-goto="${
          currPage + 1
        }">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // If we are on the last page
    if (currPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currPage - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
      `;
    }

    // If we are on the page in the middle
    if (currPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currPage - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-goto="${
          currPage + 1
        }">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // If there are no other pages
    return ``;
  }
}
export default new PaginationView();
