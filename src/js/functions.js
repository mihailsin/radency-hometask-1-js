import { nanoid } from 'nanoid';
import { selectors } from './selectors';
import { todos } from '../data/todos';
import { renderTodos, createTodos, createCategoriesList } from './markup';

const todosHeader = `<tr class="table-header__row">
          <th class="table-header__data">Name</th>
          <th class="table-header__data">Created</th>
          <th class="table-header__data">Category</th>
          <th class="table-header__data">Content</th>
          <th class="table-header__data">Deadline</th>
          <th class="table-header__data">
          <button type="button" class="archive-all">archive</button>
          <button type="button" class="delete-all">delete</button>
          </th>
        </tr>`;

const categoriesHeader = `<tr class="table-header__row">
            <th class="table-header__data">Note Category</th>
            <th class="table-header__data">Active</th>
            <th class="table-header__data">Archived</th>
          </tr>`;

const itemButtonsClickHandler = e => {
  if (e.target.classList.contains('delete-item')) {
    console.log(Number(e.target.id));
    todos[Number(e.target.id)].active = false;
    todos.splice(Number(e.target.id), 1);
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
  }

  if (e.target.classList.contains('archive-item')) {
    console.log(Number(e.target.id));
    todos[Number(e.target.id)].active = false;
    todos[Number(e.target.id)].archived = true;
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
  }
};

export const onSubmit = e => {
  e.preventDefault();
  selectors.todoList.innerHTML = todosHeader;
  selectors.categoriesList.innerHTML = categoriesHeader;
  const { nameInput, deadlineInput, contentInput, categoryInput } = selectors;
  const todo = {
    id: nanoid(10),
    [nameInput.name]: nameInput.value,
    [contentInput.name]: contentInput.value,
    [categoryInput.name]: categoryInput.value,
    archived: false,
    active: true,
    created: Date.now(),
    [deadlineInput.name]: deadlineInput.value,
  };
  todos.push(todo);
  renderTodos(selectors.todoList, createTodos(todos));
  renderTodos(selectors.categoriesList, createCategoriesList(todos));
};

selectors.addTodoForm.addEventListener('submit', onSubmit);

selectors.todoList.addEventListener('click', itemButtonsClickHandler);
selectors.openAddTodoButton.addEventListener('click', e => {
  selectors.addTodoModal.classList.remove('is-hidden');
});
selectors.closeAddTodoButton.addEventListener('click', e => {
  selectors.addTodoModal.classList.add('is-hidden');
});
