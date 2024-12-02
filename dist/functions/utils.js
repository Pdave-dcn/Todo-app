export function getInputValue() {
    let value = "";
    const inputElement = document.querySelector(".js-todo-input");
    value = inputElement.value;
    inputElement.value = "";
    return value;
}
export function generateTodoElementHTML(text, todo) {
    const html = `
    <div class="todo__wrapper js-todo-wrapper" data-id="${todo.id}" draggable="true">
      <input type="checkbox" name="todo-checkbox" class="todo__selector js-todo-selector" arial-label="mark as complete">
      <span class="todo__content js-todo-text ${todo.style}">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="images/icon-cross.svg" alt="cross icon" />
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
    divElement.classList.add("fade-in");
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
export function loadtheme() {
    const chosenTheme = localStorage.getItem("theme");
    const themeSelector = document.querySelector(".js-theme-selector");
    const stylesheetElement = document.querySelector(".js-stylesheet");
    if (chosenTheme) {
        if (chosenTheme === "theme-2") {
            if (themeSelector) {
                themeSelector.src = "images/icon-sun.svg";
            }
            if (stylesheetElement) {
                stylesheetElement.href = "styles/theme-2.css";
            }
        }
    }
    else {
        if (chosenTheme) {
            if (themeSelector) {
                themeSelector.src = "images/icon-moon.svg";
            }
            if (stylesheetElement) {
                stylesheetElement.href = "styles/theme-1.css";
            }
        }
    }
}
export function togglePlaceHolder() {
    const todoContainer = document.querySelector(".js-todo-container");
    const taskbarElement = document.querySelector(".js-taskbar-wrapper");
    const placeholder = document.querySelector(".js-todo-placeholder");
    if ((todoContainer === null || todoContainer === void 0 ? void 0 : todoContainer.children.length) === 0) {
        const placeholderElement = document.createElement("div");
        placeholderElement.classList.add("app__placeholder", "js-app-placeholder");
        placeholderElement.textContent = "No todos yet";
        setTimeout(() => {
            taskbarElement === null || taskbarElement === void 0 ? void 0 : taskbarElement.insertAdjacentElement("afterend", placeholderElement);
            placeholderElement.classList.add("fade-in-ph");
        }, 210);
    }
    else {
        placeholder === null || placeholder === void 0 ? void 0 : placeholder.remove();
    }
}
export function updateTodoOrder() {
    const todoContainer = document.querySelector(".js-todo-container");
    if (!todoContainer)
        return;
    const wrapperElements = document.querySelectorAll(".js-todo-wrapper");
    const newOrder = [];
    wrapperElements.forEach((wrapperElement) => {
        const id = wrapperElement.getAttribute("data-id");
        if (id) {
            const todos = loadTodosFromLocalStorage();
            const todo = todos.find((todo) => todo.id === id);
            if (todo) {
                newOrder.push(todo);
            }
        }
    });
    saveTodosTolocalStorage(newOrder);
}
export function toggleReorderNotice() {
    const taskbarElement = document.querySelector(".js-taskbar-wrapper");
    const todosContainer = document.querySelector(".js-todo-container");
    if (!taskbarElement || !todosContainer)
        return;
    const existingNotice = taskbarElement.nextElementSibling;
    if (todosContainer.children.length <= 1) {
        existingNotice === null || existingNotice === void 0 ? void 0 : existingNotice.remove();
        return;
    }
    if (!(existingNotice === null || existingNotice === void 0 ? void 0 : existingNotice.classList.contains("js-app-notice"))) {
        const divElement = document.createElement("div");
        divElement.classList.add("app__notice", "js-app-notice");
        divElement.textContent = "Drag and drop to reorder list";
        taskbarElement === null || taskbarElement === void 0 ? void 0 : taskbarElement.insertAdjacentElement("afterend", divElement);
    }
}
//# sourceMappingURL=utils.js.map