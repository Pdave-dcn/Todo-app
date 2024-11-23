import * as fromUtilsGet from "./utils.js";

export function updateTheme(element: HTMLImageElement): void {
  const stylesheetElement =
    document.querySelector<HTMLLinkElement>(".js-stylesheet");
  if (element.src.includes("icon-moon.svg")) {
    element.src = "images/icon-sun.svg";

    if (stylesheetElement) {
      stylesheetElement.href = "styles/theme-2.css";
    }
  } else {
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

  const todoContainer = document.querySelector<HTMLElement>(
    ".js-todo-container"
  ) as HTMLElement;

  if (todoContainer) {
    todoContainer?.prepend(divElement);
  }

  if (todoContainer.children.length > 0 && todoContainer.children.length < 2) {
    fromUtilsGet.showTaskbar();
  }
}

export function deleteTodo(element: HTMLElement): void {
  element.remove();

  const todoContainer = document.querySelector(
    ".js-todo-container"
  ) as HTMLElement;
  if (todoContainer && todoContainer.children.length === 0) {
    fromUtilsGet.removeTaskbar();
  }
}
