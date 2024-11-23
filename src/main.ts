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
  }
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLInputElement;

  if (target.type === "checkbox" && target.checked) {
    console.log("Checkbox");
    document
      .querySelector<HTMLElement>(".js-todo-text")
      ?.classList.add("checked-state");
  } else {
    document
      .querySelector<HTMLElement>(".js-todo-text")
      ?.classList.remove("checked-state");
  }
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("js-delete-icon")) {
    const todoElement = target.closest(".todo") as HTMLElement;
    todoElement.remove();
  }
});
