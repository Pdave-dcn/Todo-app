export function getInputValue() {
    let value = "";
    const inputElement = document.querySelector(".js-todo-input");
    value = inputElement.value;
    inputElement.value = "";
    return value;
}
export function generateHTML(text) {
    const html = `
    <div class="todo__wrapper">
      <input type="checkbox" name="" id="todo-btn" class="todo__selector">
    <span class="todo__content js-todo-text">${text}</span>
    </div>
    <img class="todo__icon js-delete-icon" src="../../images/icon-cross.svg" alt="cross icon" />
  `;
    return html;
}
//# sourceMappingURL=utils.js.map