import * as fromMainFunctionsGet from "./functions/main-functions.js";

document
  .querySelector<HTMLImageElement>(".js-theme-selector")
  ?.addEventListener("click", (event) => {
    const target = event.target as HTMLImageElement;
    fromMainFunctionsGet.updateTheme(target);
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fromMainFunctionsGet.createTodo();
    fromMainFunctionsGet.updateUncheckedCount();
  }
});

document.addEventListener("click", (event) => {
  const filterBtns = document.querySelectorAll(
    ".js-filter-btns button"
  ) as NodeList;
  if (filterBtns.length === 0) return;

  const target = (event.target as HTMLElement).closest("button");
  if (!target) return;

  if (
    target?.classList.contains("filter") &&
    target?.classList.contains("focus-state")
  ) {
    return;
  } else if (
    target?.classList.contains("filter") &&
    !target?.classList.contains("focus-state")
  ) {
    filterBtns.forEach((button) => {
      const btn = button as HTMLElement;
      if (btn.classList.contains("focus-state")) {
        btn.classList.remove("focus-state");
      }
    });

    target.classList.add("focus-state");
  }
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("js-todo-selector")) {
    const checkbox = target as HTMLInputElement;
    const todoWrapper = checkbox.closest(".js-todo-wrapper") as HTMLElement;
    const textElement = todoWrapper?.querySelector(
      ".js-todo-text"
    ) as HTMLElement;

    if (checkbox.checked) {
      textElement?.classList.add("checked-state");
      fromMainFunctionsGet.updateUncheckedCount();
    } else {
      textElement?.classList.remove("checked-state");
      fromMainFunctionsGet.updateUncheckedCount();
    }
  }
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("js-delete-icon")) {
    const todoElement = target.closest(".todo") as HTMLElement;
    fromMainFunctionsGet.deleteTodo(todoElement);
    fromMainFunctionsGet.updateUncheckedCount();
  }
});
