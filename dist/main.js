import * as fromMainFunctionsGet from "./functions/main-functions.js";
import * as fromUtilsGet from "./functions/utils.js";
window.addEventListener("DOMContentLoaded", () => {
    fromUtilsGet.loadTheme();
    const todos = fromUtilsGet.loadTodosFromLocalStorage();
    fromMainFunctionsGet.renderTodos(todos);
    fromUtilsGet.togglePlaceHolder();
    if (todos.length > 0)
        fromUtilsGet.showTaskbar();
    fromUtilsGet.toggleReorderNotice();
    fromMainFunctionsGet.updateUncheckedCount();
});
document.addEventListener("click", (event) => {
    const target = event.target;
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
function handleThemeSelector(target) {
    if (target.classList.contains("js-theme-selector"))
        fromMainFunctionsGet.updateTheme(target);
}
function handleTodoAFilterBtnsStyle(target) {
    const filterBtns = document.querySelectorAll(".js-filter-btns button");
    if (filterBtns.length === 0)
        return;
    const buttonElement = target.closest("button");
    if (!target)
        return;
    if ((buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.classList.contains("filter")) &&
        (buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.classList.contains("focus-state"))) {
        return;
    }
    else if ((buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.classList.contains("filter")) &&
        !(buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.classList.contains("focus-state"))) {
        filterBtns.forEach((button) => {
            const btn = button;
            if (btn.classList.contains("focus-state")) {
                btn.classList.remove("focus-state");
            }
        });
        buttonElement.classList.add("focus-state");
    }
}
function handleTodoActions(target) {
    if (target.classList.contains("js-todo-selector")) {
        const checkbox = target;
        const todoWrapper = checkbox.closest(".js-todo-wrapper");
        const textElement = todoWrapper === null || todoWrapper === void 0 ? void 0 : todoWrapper.querySelector(".js-todo-text");
        const todoId = (todoWrapper === null || todoWrapper === void 0 ? void 0 : todoWrapper.getAttribute("data-id")) || "";
        const todos = fromUtilsGet.loadTodosFromLocalStorage();
        const todo = todos.find((todo) => todo.id === todoId);
        if (todo) {
            todo.completed = checkbox.checked;
            if (todo.completed) {
                todo.style = "checked-state";
            }
            else {
                todo.style = "";
            }
            fromUtilsGet.saveTodosTolocalStorage(todos);
        }
        if (checkbox.checked) {
            textElement === null || textElement === void 0 ? void 0 : textElement.classList.add("checked-state");
        }
        else {
            textElement === null || textElement === void 0 ? void 0 : textElement.classList.remove("checked-state");
        }
        fromMainFunctionsGet.updateUncheckedCount();
    }
}
function handleDeleteTodo(target) {
    if (target.classList.contains("js-delete-icon")) {
        const todoElement = target.closest(".todo");
        const todoWrapper = todoElement.querySelector(".js-todo-wrapper");
        const todoId = (todoWrapper === null || todoWrapper === void 0 ? void 0 : todoWrapper.getAttribute("data-id")) || "";
        const todos = fromUtilsGet.loadTodosFromLocalStorage();
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        fromUtilsGet.saveTodosTolocalStorage(updatedTodos);
        fromMainFunctionsGet.deleteTodo(todoElement);
        fromMainFunctionsGet.updateUncheckedCount();
    }
}
function handleTaskbarAction(target) {
    switch (true) {
        case target.classList.contains("js-btn-all"):
            fromMainFunctionsGet.displayFilteredTodos("all");
            break;
        case target.classList.contains("js-btn-active"):
            fromMainFunctionsGet.displayFilteredTodos("active");
            break;
        case target.classList.contains("js-btn-completed"):
            fromMainFunctionsGet.displayFilteredTodos("completed");
            break;
        case target.classList.contains("js-btn-clear"):
            fromMainFunctionsGet.clearCompletedTodos();
            break;
    }
}
let draggedElement = null;
document.addEventListener("dragstart", (event) => {
    var _a;
    const target = event.target.closest(".todo");
    if (target) {
        draggedElement = target;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("plain/text", target.dataset.id || "");
    }
});
document.addEventListener("dragover", (event) => {
    event.preventDefault();
    const target = event.target.closest(".todo");
    if (target && target !== draggedElement) {
        target.style.borderTop = "2px solid #aaa";
    }
});
document.addEventListener("dragleave", (event) => {
    const target = event.target.closest(".todo");
    if (target) {
        target.style.borderTop = "";
    }
});
document.addEventListener("drop", (event) => {
    event.preventDefault();
    const target = event.target.closest(".todo");
    if (target && draggedElement) {
        target.style.borderTop = "";
        const todoContainer = document.querySelector(".js-todo-container");
        if (todoContainer) {
            todoContainer.insertBefore(draggedElement, target);
            fromUtilsGet.updateTodoOrder();
        }
    }
});
//# sourceMappingURL=main.js.map