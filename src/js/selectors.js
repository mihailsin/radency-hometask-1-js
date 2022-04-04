export const todoList = document.querySelector('.table');
export const addTodo = document.querySelector('.submit');
export const addTodoForm = document.querySelector('.todo-form');
export const nameInput = document.querySelector('#name');
export const dateInput = document.querySelector('#date');
export const contentInput = document.querySelector('#content');
export const categoryInput = document.querySelector('#category');
addTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.target);

  const todo = {
    [nameInput.name]: nameInput.value,
    [dateInput.name]: dateInput.value,
    [contentInput.name]: contentInput.value,
    [categoryInput.name]: categoryInput.value,
  };
  console.log(todo);
});
