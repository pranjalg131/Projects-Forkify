import { async } from "regenerator-runtime";
import { API_KEY, API_URL, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

// State Variable holding the current application state
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // Nice Trick , note that down in the notes
    ...(recipe.key && { key: recipe.key }),
  };
};

// function to make async requests to the api and update the state
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

// To store the data to the local storage
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (state.recipe.id === recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();
};

export const removeBookmark = function (id) {
  // Removing Bookmark from the array
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Changing the bookmarked state of the recipe
  state.recipe.bookmarked = false;

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    // Set the data into the correct format.
    // 1. Correct the ingredients array first.

    const ingredients = Object.entries(newRecipe)
      .filter((el) => el[0].startsWith("ingredient") && el[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3) {
          throw new Error(
            "Invalid Ingredient Format , Please use the correct format :)"
          );
        }

        const [quantity, unit, description] = [...ingArr];

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const data = localStorage.getItem("bookmarks");
  if (data) state.bookmarks = JSON.parse(data);
};
init();
