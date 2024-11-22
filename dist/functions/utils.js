export function getInputValue() {
    let value = "";
    const inputElement = document.querySelector(".js-todo-input");
    value = inputElement.value;
    inputElement.value = "";
    return value;
}
export function generateHTML(text) {
    const html = `
    <input type="checkbox" name="" id="todo-btn" class="todo__selector">
    <span class="todo__content">${text}</span>
  `;
    return html;
}
//# sourceMappingURL=utils.js.map