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
    <input type="checkbox" name="" id="todo-btn" class="todo__selector">
    <span class="todo__content">${text}</span>
  `;

  return html;
}
