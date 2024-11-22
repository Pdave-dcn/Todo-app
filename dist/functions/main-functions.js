import * as fromUtilsGet from "./utils.js";
export function updateTheme(element) {
    const stylesheetElement = document.querySelector(".js-stylesheet");
    if (element.src.includes("icon-moon.svg")) {
        element.src = "images/icon-sun.svg";
        if (stylesheetElement) {
            stylesheetElement.href = "styles/theme-2.css";
        }
    }
    else {
        element.src = "images/icon-moon.svg";
        if (stylesheetElement) {
            stylesheetElement.href = "styles/theme-1.css";
        }
    }
}
export function createTodo() {
    const inputValue = fromUtilsGet.getInputValue();
    if (inputValue.trim() === "") {
        return;
    }
    const todoElement = fromUtilsGet.generateHTML(inputValue);
    const divElement = document.createElement("div");
    divElement.classList.add("todo");
    divElement.innerHTML = todoElement;
    const todoContainer = document.querySelector(".js-todo-container");
    if (todoContainer) {
        todoContainer === null || todoContainer === void 0 ? void 0 : todoContainer.appendChild(divElement);
    }
}
//# sourceMappingURL=main-functions.js.map