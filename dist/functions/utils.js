export function getInputValue() {
    let value = "";
    const inputElement = document.querySelector(".js-todo-input");
    value = inputElement.value;
    inputElement.value = "";
    return value;
}
export function generateTodoElementHTML(text, todo) {
    const html = `
    <div class="todo__wrapper js-todo-wrapper" data-id="${todo.id}">
      <input type="checkbox" class="todo__selector js-todo-selector">
      <span class="todo__content js-todo-text ${todo.style}">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="../../images/icon-cross.svg" alt="cross icon" />
  `;
    return html;
}
export function generateTaskbarHTML() {
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
export function showTaskbar() {
    const taskbarHTML = generateTaskbarHTML();
    const todoContainer = document.querySelector(".js-todo-container");
    const taskbarWrapper = todoContainer === null || todoContainer === void 0 ? void 0 : todoContainer.nextElementSibling;
    const divElement = document.createElement("div");
    divElement.classList.add("taskbar");
    divElement.innerHTML = taskbarHTML;
    taskbarWrapper === null || taskbarWrapper === void 0 ? void 0 : taskbarWrapper.appendChild(divElement);
}
export function removeTaskbar() {
    const taskbarElement = document.querySelector(".taskbar");
    taskbarElement === null || taskbarElement === void 0 ? void 0 : taskbarElement.remove();
}
export function getTodoElement(element) {
    let filteredTodos = [];
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
export function saveTodosTolocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
export function loadTodosFromLocalStorage() {
    const todoJSON = localStorage.getItem("todos");
    try {
        return todoJSON ? JSON.parse(todoJSON) : [];
    }
    catch (error) {
        console.error("Error parsing todos from localStorage", error);
        return [];
    }
}
//# sourceMappingURL=utils.js.map