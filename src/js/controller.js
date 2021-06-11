import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

import "core-js/stable";
import "regenerator-runtime/runtime";
import bookmarksView from "./views/bookmarksView";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // Getting the id from the hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Updating the results
    resultsView.update(model.getSearchResultsPerPage());
    bookmarksView.update(model.state.bookmarks);

    // Loading the recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Getting the query from the view
    const query = searchView.getQuery();
    if (!query) return;

    // Loading the search results from API
    await model.loadSearchResults(query);

    // Rendering the results
    resultsView.render(model.getSearchResultsPerPage());

    // Rendering the pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // Render the new search results
  resultsView.render(model.getSearchResultsPerPage(goToPage));

  // Render the new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the servings
  model.updateServings(newServings);

  // Render the new recipe
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // update the current recipe with the bookmark
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRenderBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
