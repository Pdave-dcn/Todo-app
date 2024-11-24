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
    const filterBtns = document.querySelectorAll(".js-filter-btns button");
    if (filterBtns.length === 0)
        return;
    const target = event.target.closest("button");
    if (!target)
        return;
    if ((target === null || target === void 0 ? void 0 : target.classList.contains("filter")) &&
        (target === null || target === void 0 ? void 0 : target.classList.contains("focus-state"))) {
        console.log("The focus button");
        return;
    }
    else if ((target === null || target === void 0 ? void 0 : target.classList.contains("filter")) &&
        !(target === null || target === void 0 ? void 0 : target.classList.contains("focus-state"))) {
        filterBtns.forEach((button) => {
            const btn = button;
            if (btn.classList.contains("focus-state")) {
                btn.classList.remove("focus-state");
            }
        });
        target.classList.add("focus-state");
    }
});
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("js-todo-selector")) {
        const checkbox = target;
        const todoWrapper = checkbox.closest(".js-todo-wrapper");
        const textElement = todoWrapper === null || todoWrapper === void 0 ? void 0 : todoWrapper.querySelector(".js-todo-text");
        if (checkbox.checked) {
            textElement === null || textElement === void 0 ? void 0 : textElement.classList.add("checked-state");
        }
        else {
            textElement === null || textElement === void 0 ? void 0 : textElement.classList.remove("checked-state");
        }
    }
});
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("js-delete-icon")) {
        const todoElement = target.closest(".todo");
        fromMainFunctionsGet.deleteTodo(todoElement);
    }
});
//# sourceMappingURL=main.js.map