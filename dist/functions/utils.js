export function getInputValue() {
    let value = "";
    const inputElement = document.querySelector(".js-todo-input");
    value = inputElement.value;
    inputElement.value = "";
    return value;
}
export function generateHTML(text) {
    const html = `
    <div class="todo__wrapper js-todo-wrapper">
      <input type="checkbox" class="todo__selector js-todo-selector">
      <span class="todo__content js-todo-text">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="../../images/icon-cross.svg" alt="cross icon" />
  `;
    return html;
}
export function generateTaskbarHTML() {
    const html = `
  <span class="taskbar__counter">n items left</span>
  <div class="taskbar__filter js-filter-btns">
    <button type="button" class="taskbar__filter--all filter focus-state">All</button>
    <button type="button" class="taskbar__filter--active filter">Active</button>
    <button type="button" class="taskbar__filter--completed filter">Completed</button>
  </div>
  <button type="button" class="taskbar__clear">Clear Completed</button>
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
//# sourceMappingURL=utils.js.map