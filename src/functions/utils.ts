import { Todo } from "./types/types.js";

export function getInputValue(): string {
  let value = "";

  const inputElement: HTMLInputElement = document.querySelector(
    ".js-todo-input"
  ) as HTMLInputElement;

  value = inputElement.value;
  inputElement.value = "";

  return value;
}

export function generateTodoElementHTML(text: string, todo: Todo): string {
  const html = `
    <div class="todo__wrapper js-todo-wrapper" data-id="${todo.id}">
      <input type="checkbox" class="todo__selector js-todo-selector">
      <span class="todo__content js-todo-text ${todo.style}">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="../../images/icon-cross.svg" alt="cross icon" />
  `;

  return html;
}

export function generateTaskbarHTML(): string {
  const html = `
  <span class="taskbar__counter js-todo-counter">n item(s) left</span>
  <div class="taskbar__filter js-filter-btns">
    <button type="button" class="taskbar__filter--all filter focus-state js-btn-all">All</button>
    <button type="button" class="taskbar__filter--active filter js-btn-active">Active</button>
    <button type="button" class="taskbar__filter--completed filter js-btn-completed">Completed</button>
  </div>
  <button type="button" class="taskbar__clear js-btn-clear">Clear Completed</button>
  `;

  return html;
}

export function showTaskbar(): void {
  const taskbarHTML = generateTaskbarHTML();

  const todoContainer =
    document.querySelector<HTMLElement>(".js-todo-container");

  const taskbarWrapper = todoContainer?.nextElementSibling;

  const divElement = document.createElement("div");
  divElement.classList.add("taskbar");
  divElement.innerHTML = taskbarHTML;

  taskbarWrapper?.appendChild(divElement);
}

export function removeTaskbar(): void {
  const taskbarElement = document.querySelector<HTMLElement>(".taskbar");

  taskbarElement?.remove();
}

export function getTodoElement(
  element: "all" | "active" | "completed"
): Todo[] {
  let filteredTodos: Todo[] = [];
  const allTodos = loadTodosFromLocalStorage();

  switch (element) {
    case "all":
      filteredTodos = allTodos;
      break;

    case "active":
      filteredTodos = allTodos.filter((todo) => !todo.completed);

      break;

    case "completed":
      filteredTodos = allTodos.filter((todo) => todo.completed);
      break;
  }

  return filteredTodos;
}

export function saveTodosTolocalStorage(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodosFromLocalStorage(): Todo[] {
  const todoJSON = localStorage.getItem("todos");

  try {
    return todoJSON ? JSON.parse(todoJSON) : [];
  } catch (error) {
    console.error("Error parsing todos from localStorage", error);
    return [];
  }
}

export function loadtheme(): void {
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

export function togglePlaceHolder(): void {
  const todoContainer =
    document.querySelector<HTMLElement>(".js-todo-container");
  const placeholder = document.querySelector<HTMLElement>(
    ".js-todo-placeholder"
  );

  if (todoContainer?.children.length === 0) {
    const placeholderElement = document.createElement("div");
    placeholderElement.classList.add(
      "todo__placeholder",
      "js-todo-placeholder"
    );

    placeholderElement.textContent = "No todos yet";

    todoContainer.appendChild(placeholderElement);
  } else {
    placeholder?.remove();
  }
}
