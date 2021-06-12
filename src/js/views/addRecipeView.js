import View from "./View";
import icons from "url:../../img/icons.svg";

class addRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "The recipe was uploaded successfully :)";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");

  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new addRecipeView();
