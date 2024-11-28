import * as fromMainFunctionsGet from "./functions/main-functions.js";
import * as fromUtilsGet from "./functions/utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const todos = fromUtilsGet.loadTodosFromLocalStorage();

  fromMainFunctionsGet.renderTodos(todos);

  if (todos.length > 0) fromUtilsGet.showTaskbar();

  fromMainFunctionsGet.updateUncheckedCount();
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  handleThemeSelector(target);
  handleTodoAFilterBtnsStyle(target);
  handleTodoActions(target);
  handleDeleteTodo(target);
  handleTaskbarAction(target);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fromMainFunctionsGet.createTodo();
  }
});

function handleThemeSelector(target: HTMLElement): void {
  if (target.classList.contains("js-theme-selector"))
    fromMainFunctionsGet.updateTheme(target as HTMLImageElement);
}

function handleTodoAFilterBtnsStyle(target: HTMLElement): void {
  const filterBtns = document.querySelectorAll(
    ".js-filter-btns button"
  ) as NodeList;
  if (filterBtns.length === 0) return;

  const buttonElement = target.closest("button");
  if (!target) return;

  if (
    buttonElement?.classList.contains("filter") &&
    buttonElement?.classList.contains("focus-state")
  ) {
    return;
  } else if (
    buttonElement?.classList.contains("filter") &&
    !buttonElement?.classList.contains("focus-state")
  ) {
    filterBtns.forEach((button) => {
      const btn = button as HTMLElement;
      if (btn.classList.contains("focus-state")) {
        btn.classList.remove("focus-state");
      }
    });

    buttonElement.classList.add("focus-state");
  }
}

function handleTodoActions(target: HTMLElement): void {
  if (target.classList.contains("js-todo-selector")) {
    const checkbox = target as HTMLInputElement;
    const todoWrapper = checkbox.closest(".js-todo-wrapper") as HTMLElement;
    const textElement = todoWrapper?.querySelector(
      ".js-todo-text"
    ) as HTMLElement;

    const todoId = todoWrapper?.getAttribute("data-id") || "";
    const todos = fromUtilsGet.loadTodosFromLocalStorage();

    const todo = todos.find((todo) => todo.id === todoId);

    if (todo) {
      todo.completed = checkbox.checked;

      if (todo.completed) {
        todo.style = "checked-state";
      } else {
        todo.style = "";
      }

      fromUtilsGet.saveTodosTolocalStorage(todos);
    }

    if (checkbox.checked) {
      textElement?.classList.add("checked-state");
    } else {
      textElement?.classList.remove("checked-state");
    }
    //fromUtilsGet.saveTodosTolocalStorage(textElement)
    fromMainFunctionsGet.updateUncheckedCount();
  }
}

function handleDeleteTodo(target: HTMLElement): void {
  if (target.classList.contains("js-delete-icon")) {
    const todoElement = target.closest(".todo") as HTMLElement;
    const todoWrapper = todoElement.querySelector(".js-todo-wrapper");

    const todoId = todoWrapper?.getAttribute("data-id") || "";
    const todos = fromUtilsGet.loadTodosFromLocalStorage();

    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    fromUtilsGet.saveTodosTolocalStorage(updatedTodos);

    fromMainFunctionsGet.deleteTodo(todoElement);
    fromMainFunctionsGet.updateUncheckedCount();
  }
}

function handleTaskbarAction(target: HTMLElement): void {
  switch (true) {
    case target.classList.contains("js-btn-all"):
      //console.log("Show all todo");
      fromMainFunctionsGet.displayAllTodo();
      break;
    case target.classList.contains("js-btn-active"):
      //console.log("Show active todo");
      fromMainFunctionsGet.displayActiveTodo();
      break;
    case target.classList.contains("js-btn-completed"):
      fromMainFunctionsGet.displayCompletedTodo();
      //console.log("Show completed todo");
      break;
    case target.classList.contains("js-btn-clear"):
      console.log("Clear all completed todo");
      break;
  }
}
