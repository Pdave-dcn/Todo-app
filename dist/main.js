var _a;
import * as fromMainFunctionsGet from "./functions/main-functions.js";
(_a = document
    .querySelector(".js-theme-selector")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
    const target = event.target;
    fromMainFunctionsGet.updateTheme(target);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fromMainFunctionsGet.createTodo();
    }
});
//# sourceMappingURL=main.js.map