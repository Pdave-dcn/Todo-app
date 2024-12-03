import * as fromUtilsGet from "./utils.js";
import { Todo } from "./types/types.js";

const todoContainer = document.querySelector<HTMLElement>(
  ".js-todo-container"
) as HTMLElement;

export function updateTheme(element: HTMLImageElement): void {
  const stylesheetElement =
    document.querySelector<HTMLLinkElement>(".js-stylesheet");

  const body = document.body;
  body.classList.add("fade-out");

  // Define a function to handle the animation end event
  const handleAnimationEnd = () => {
    // Remove the event listener to avoid it being triggered multiple times
    body.removeEventListener("animationend", handleAnimationEnd);

    // Switch the theme based on the current icon
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

    // Remove the fade-out class and add the fade-in class
    body.classList.remove("fade-out");

    body.classList.add("fade-in");

    // Remove the fade-in class after the animation is complete
    body.addEventListener("animationend", () => {
      body.classList.remove("fade-in");
    });
  };

  // Add the animationend event listener
  body.addEventListener("animationend", handleAnimationEnd);
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
  divElement.draggable = true;
  divElement.innerHTML = todoElement;

  if (todoContainer) {
    todoContainer?.prepend(divElement);
    //divElement.classList.add("fade-out");
  }

  const todos = fromUtilsGet.loadTodosFromLocalStorage();
  todos.push(newTodo);
  fromUtilsGet.saveTodosTolocalStorage(todos);

  fromUtilsGet.togglePlaceHolder();

  if (todoContainer && todoContainer.children.length === 1) {
    fromUtilsGet.showTaskbar();
  }
  updateUncheckedCount();
  fromUtilsGet.toggleReorderNotice();
}

export function deleteTodo(element: HTMLElement): void {
  element.classList.add("fade-out");

  element.addEventListener("animationend", () => {
    element.remove();

    updateUncheckedCount();

    fromUtilsGet.toggleReorderNotice();

    if (todoContainer && todoContainer.children.length === 0) {
      fromUtilsGet.removeTaskbar();
    }

    fromUtilsGet.togglePlaceHolder();
  });
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

export function displayFilteredTodos(
  element: "all" | "active" | "completed"
): void {
  switch (element) {
    case "all":
      const allTodos = fromUtilsGet.getTodoElement("all");
      renderTodos(allTodos);
      break;

    case "active":
      const activeTodos = fromUtilsGet.getTodoElement("active");
      renderTodos(activeTodos);
      break;

    case "completed":
      const completedTodos = fromUtilsGet.getTodoElement("completed");
      renderTodos(completedTodos);
      break;
  }
}

export function clearCompletedTodos(): void {
  const todos = fromUtilsGet.loadTodosFromLocalStorage();

  const updatedTodos = todos.filter((todo) => !todo.completed);

  fromUtilsGet.saveTodosTolocalStorage(updatedTodos);

  renderTodos(updatedTodos);
  fromUtilsGet.togglePlaceHolder();

  updateUncheckedCount();
  fromUtilsGet.toggleReorderNotice();

  if (updatedTodos.length === 0) fromUtilsGet.removeTaskbar();
}

export function renderTodos(todos: Todo[]): void {
  if (!todoContainer) return;

  todoContainer.innerHTML = "";

  todos.forEach((todo) => {
    const divElement = document.createElement("div");
    divElement.classList.add("todo");
    divElement.draggable = true;
    divElement.innerHTML = fromUtilsGet.generateTodoElementHTML(
      todo.text,
      todo
    );

    const checkbox =
      divElement.querySelector<HTMLInputElement>(".js-todo-selector");

    if (checkbox) checkbox.checked = todo.completed;

    todoContainer.appendChild(divElement);
    fromUtilsGet.toggleReorderNotice();
  });
}
