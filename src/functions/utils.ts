export function getInputValue(): string {
  let value = "";

  const inputElement: HTMLInputElement = document.querySelector(
    ".js-todo-input"
  ) as HTMLInputElement;

  value = inputElement.value;
  inputElement.value = "";

  return value;
}

export function generateHTML(text: string): string {
  const html = `
    <div class="todo__wrapper">
      <input type="checkbox" name="" id="todo-btn" class="todo__selector">
    <span class="todo__content js-todo-text">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="../../images/icon-cross.svg" alt="cross icon" />
  `;

  return html;
}

export function generateTaskbarHTML(): string {
  const html = `
  <span class="taskbar__counter">n items left</span>
  <div class="taskbar__filter">
    <button type="button" class="taskbar__filter--all">All</button>
    <button type="button" class="taskbar__filter--active">Active</button>
    <button type="button" class="taskbar__filter--completed">Completed</button>
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
}

export function removeTaskbar(): void {
  const taskbarElement = document.querySelector<HTMLElement>(".taskbar");

  taskbarElement?.remove();
}
