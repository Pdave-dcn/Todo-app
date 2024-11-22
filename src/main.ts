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
