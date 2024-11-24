export function getInputValue(): string {
  let value = "";

  const inputElement: HTMLInputElement = document.querySelector(
    ".js-todo-input"
  ) as HTMLInputElement;

  value = inputElement.value;
  inputElement.value = "";

  return value;
}

export function generateTodoElementHTML(text: string): string {
  const html = `
    <div class="todo__wrapper js-todo-wrapper">
      <input type="checkbox" class="todo__selector js-todo-selector">
      <span class="todo__content js-todo-text">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="../../images/icon-cross.svg" alt="cross icon" />
  `;

  return html;
}

export function generateTaskbarHTML(): string {
  const html = `
  <span class="taskbar__counter js-todo-counter">n item(s) left</span>
  <div class="taskbar__filter js-filter-btns">
    <button type="button" class="taskbar__filter--all filter focus-state">All</button>
    <button type="button" class="taskbar__filter--active filter">Active</button>
    <button type="button" class="taskbar__filter--completed filter">Completed</button>
  </div>
  <button type="button" class="taskbar__clear">Clear Completed</button>
  `;

  return html;
}

export function showTaskbar(): void {
  const taskbarHTML = generateTaskbarHTML();

  const todoContainer =
    document.querySelector<HTMLElement>(".js-todo-container");

  const taskbarWrapper = todoContainer?.nextElementSibling;

  const divElement = document.createElement("div");
  divElement.classList.add("taskbar");
  divElement.innerHTML = taskbarHTML;

  taskbarWrapper?.appendChild(divElement);

  //attachFocusEventListeners();
}

export function removeTaskbar(): void {
  const taskbarElement = document.querySelector<HTMLElement>(".taskbar");

  taskbarElement?.remove();
}
