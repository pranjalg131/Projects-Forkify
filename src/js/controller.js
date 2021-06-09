import * as model from "./model";
import recipeView from "./views/recipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipes = async function () {
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

showRecipes();

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, showRecipes)
);
