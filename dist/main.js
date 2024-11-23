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
document.addEventListener("click", (event) => {
    var _a, _b;
    const target = event.target;
    if (target.type === "checkbox" && target.checked) {
        console.log("Checkbox");
        (_a = document
            .querySelector(".js-todo-text")) === null || _a === void 0 ? void 0 : _a.classList.add("checked-state");
    }
    else {
        (_b = document
            .querySelector(".js-todo-text")) === null || _b === void 0 ? void 0 : _b.classList.remove("checked-state");
    }
});
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("js-delete-icon")) {
        const todoElement = target.closest(".todo");
        todoElement.remove();
    }
});
//# sourceMappingURL=main.js.map