import * as fromUtilsGet from "./utils.js";
const todoContainer = document.querySelector(".js-todo-container");
export function updateTheme(element) {
    const stylesheetElement = document.querySelector(".js-stylesheet");
    if (element.src.includes("icon-moon.svg")) {
        element.src = "images/icon-sun.svg";
        if (stylesheetElement) {
            stylesheetElement.href = "styles/theme-2.css";
        }
    }
    else {
        element.src = "images/icon-moon.svg";
        if (stylesheetElement) {
            stylesheetElement.href = "styles/theme-1.css";
        }
    }
}
export function createTodo() {
    const inputValue = fromUtilsGet.getInputValue();
    if (inputValue.trim() === "")
        return;
    const newTodo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
        style: "",
    };
    const todoElement = fromUtilsGet.generateTodoElementHTML(inputValue, newTodo);
    const divElement = document.createElement("div");
    divElement.classList.add("todo");
    divElement.innerHTML = todoElement;
    if (todoContainer) {
        todoContainer === null || todoContainer === void 0 ? void 0 : todoContainer.prepend(divElement);
    }
    const todos = fromUtilsGet.loadTodosFromLocalStorage();
    todos.push(newTodo);
    fromUtilsGet.saveTodosTolocalStorage(todos);
    if (todoContainer && todoContainer.children.length === 1) {
        fromUtilsGet.showTaskbar();
    }
    updateUncheckedCount();
}
export function deleteTodo(element) {
    element.remove();
    if (todoContainer && todoContainer.children.length === 0) {
        fromUtilsGet.removeTaskbar();
    }
}
export function updateUncheckedCount() {
    const todoCounterElement = document.querySelector(".js-todo-counter");
    if (!todoCounterElement)
        return;
    const uncheckedTodo = document.querySelectorAll(".js-todo-selector:not(:checked)");
    let uncheckedCount = uncheckedTodo.length;
    todoCounterElement.textContent = `${uncheckedCount} item${uncheckedCount > 1 ? "s" : ""} left`;
}
export function displayAllTodo() {
    const allTodos = fromUtilsGet.getTodoElement("all");
    renderTodos(allTodos);
}
export function displayActiveTodo() {
    const activeTodos = fromUtilsGet.getTodoElement("active");
    renderTodos(activeTodos);
}
export function displayCompletedTodo() {
    const completedTodos = fromUtilsGet.getTodoElement("completed");
    renderTodos(completedTodos);
}
export function renderTodos(todos) {
    if (!todoContainer)
        return;
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        const divElement = document.createElement("div");
        divElement.classList.add("todo");
        divElement.innerHTML = fromUtilsGet.generateTodoElementHTML(todo.text, todo);
        const checkbox = divElement.querySelector(".js-todo-selector");
        if (checkbox)
            checkbox.checked = todo.completed;
        todoContainer.appendChild(divElement);
    });
}
//# sourceMappingURL=main-functions.js.map