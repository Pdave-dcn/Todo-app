import * as fromUtilsGet from "./utils.js";
import { Todo } from "./types/types.js";

const todoContainer = document.querySelector<HTMLElement>(
  ".js-todo-container"
) as HTMLElement;

export function updateTheme(element: HTMLImageElement): void {
  const stylesheetElement =
    document.querySelector<HTMLLinkElement>(".js-stylesheet");
  if (element.src.includes("icon-moon.svg")) {
    element.src = "images/icon-sun.svg";

    if (stylesheetElement) {
      stylesheetElement.href = "styles/theme-2.css";
      localStorage.setItem("theme", "theme-2");
    }
  } else {
    element.src = "images/icon-moon.svg";
    if (stylesheetElement) {
      stylesheetElement.href = "styles/theme-1.css";
      localStorage.setItem("theme", "theme-1");
    }
  }
}

export function loadtheme() {
  const chosenTheme = localStorage.getItem("theme") as string;

  const themeSelector =
    document.querySelector<HTMLImageElement>(".js-theme-selector");

  const stylesheetElement =
    document.querySelector<HTMLLinkElement>(".js-stylesheet");

  if (chosenTheme) {
    if (chosenTheme === "theme-2") {
      if (themeSelector) {
        themeSelector.src = "images/icon-sun.svg";
      }

      if (stylesheetElement) {
        stylesheetElement.href = "styles/theme-2.css";
      }
    }
  } else {
    if (chosenTheme) {
      if (themeSelector) {
        themeSelector.src = "images/icon-moon.svg";
      }

      if (stylesheetElement) {
        stylesheetElement.href = "styles/theme-1.css";
      }
    }
  }
}

export function createTodo(): void {
  const inputValue = fromUtilsGet.getInputValue();
  if (inputValue.trim() === "") return;

  const newTodo: Todo = {
    id: Date.now().toString(),
    text: inputValue,
    completed: false,
    style: "",
  };

  const todoElement = fromUtilsGet.generateTodoElementHTML(inputValue, newTodo);

  const divElement = document.createElement("div");
  divElement.classList.add("todo");
  divElement.innerHTML = todoElement;

  if (todoContainer) {
    todoContainer?.prepend(divElement);
  }

  const todos = fromUtilsGet.loadTodosFromLocalStorage();
  todos.push(newTodo);
  fromUtilsGet.saveTodosTolocalStorage(todos);

  if (todoContainer && todoContainer.children.length === 1) {
    fromUtilsGet.showTaskbar();
  }

  updateUncheckedCount();
}

export function deleteTodo(element: HTMLElement): void {
  element.remove();

  if (todoContainer && todoContainer.children.length === 0) {
    fromUtilsGet.removeTaskbar();
  }
}

export function updateUncheckedCount(): void {
  const todoCounterElement = document.querySelector(
    ".js-todo-counter"
  ) as HTMLElement;

  if (!todoCounterElement) return;

  const uncheckedTodo = document.querySelectorAll(
    ".js-todo-selector:not(:checked)"
  ) as NodeList;

  let uncheckedCount = uncheckedTodo.length;

  todoCounterElement.textContent = `${uncheckedCount} item${
    uncheckedCount > 1 ? "s" : ""
  } left`;
}

export function displayAllTodo(): void {
  const allTodos = fromUtilsGet.getTodoElement("all");
  renderTodos(allTodos);
}

export function displayActiveTodo(): void {
  const activeTodos = fromUtilsGet.getTodoElement("active");
  renderTodos(activeTodos);
}

export function displayCompletedTodo(): void {
  const completedTodos = fromUtilsGet.getTodoElement("completed");
  renderTodos(completedTodos);
}

export function clearCompletedTodos(): void {
  const todos = fromUtilsGet.loadTodosFromLocalStorage();

  const updatedTodos = todos.filter((todo) => !todo.completed);

  fromUtilsGet.saveTodosTolocalStorage(updatedTodos);

  renderTodos(updatedTodos);

  updateUncheckedCount();

  if (updatedTodos.length === 0) fromUtilsGet.removeTaskbar();
}

export function renderTodos(todos: Todo[]): void {
  if (!todoContainer) return;

  todoContainer.innerHTML = "";

  todos.forEach((todo) => {
    const divElement = document.createElement("div");
    divElement.classList.add("todo");
    divElement.innerHTML = fromUtilsGet.generateTodoElementHTML(
      todo.text,
      todo
    );

    const checkbox =
      divElement.querySelector<HTMLInputElement>(".js-todo-selector");

    if (checkbox) checkbox.checked = todo.completed;

    todoContainer.appendChild(divElement);
  });
}
