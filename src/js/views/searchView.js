class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#parentElement.querySelector(".search__field").value = "";
    return query;
  }

  addHandlerSearh(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
