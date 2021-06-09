import * as model from "./model";
import recipeView from "./views/recipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Getting the id from the hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading the recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
