import { nanoid } from 'nanoid';
import { selectors } from './selectors';
import { todos } from '../data/todos';
import { renderTodos, createTodos, createCategoriesList, createArchivedTodos } from './markup';

const todosHeader = `<tr class="table-header__row">
          <th class="table-header__data">Name</th>
          <th class="table-header__data">Created</th>
          <th class="table-header__data">Category</th>
          <th class="table-header__data">Content</th>
          <th class="table-header__data">Dates</th>
          <th class="table-header__data">
          <button type="button" class="archive-all">archive all</button>
          <button type="button" class="delete-all">delete all</button>
          </th>
        </tr>`;

const categoriesHeader = `<tr class="table-header__row">
            <th class="table-header__data">Note Category</th>
            <th class="table-header__data">Active</th>
            <th class="table-header__data">Archived</th>
          </tr>`;
const archivedHeader = `<tr class="table-header__row">
          <th class="table-header__data">Name</th>
          <th class="table-header__data">Created</th>
          <th class="table-header__data">Category</th>
          <th class="table-header__data">Content</th>
          <th class="table-header__data">Dates</th>
          <th class="table-header__data">
          <button type="button" class="unarchive-all">unarchive all</button>
          </th>
        </tr>`;

let itemToEdit;

export const itemButtonsClickHandler = e => {
  if (e.target.classList.contains('delete-item')) {
    todos[Number(e.target.id)].active = false;
    todos.splice(Number(e.target.id), 1);
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    selectors.archivedTodosList.innerHTML = archivedHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
    renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
  }

  if (e.target.classList.contains('archive-item')) {
    todos[Number(e.target.id)].active = false;
    todos[Number(e.target.id)].archived = true;
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    selectors.archivedTodosList.innerHTML = archivedHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
    renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
  }
  if (e.target.classList.contains('unarchive-item')) {
    todos[Number(e.target.id)].active = true;
    todos[Number(e.target.id)].archived = false;
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    selectors.archivedTodosList.innerHTML = archivedHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
    renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
  }
  if (e.target.classList.contains('archive-all')) {
    todos.map(todo => (todo.archived = true));
    todos.map(todo => (todo.active = false));
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    selectors.archivedTodosList.innerHTML = archivedHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
    renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
  }
  if (e.target.classList.contains('unarchive-all')) {
    todos.map(todo => (todo.archived = false));
    todos.map(todo => (todo.active = true));
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    selectors.archivedTodosList.innerHTML = archivedHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
    renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
  }
  if (e.target.classList.contains('delete-all')) {
    todos.splice(0, todos.length);
    selectors.todoList.innerHTML = todosHeader;
    selectors.categoriesList.innerHTML = categoriesHeader;
    selectors.archivedTodosList.innerHTML = archivedHeader;
    renderTodos(selectors.todoList, createTodos(todos));
    renderTodos(selectors.categoriesList, createCategoriesList(todos));
    renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
  }
  if (e.target.classList.contains('edit-item')) {
    selectors.editModal.classList.remove('is-hidden');
    itemToEdit = todos[Number(e.target.id)];
  }
};

export const onSubmit = e => {
  e.preventDefault();
  selectors.todoList.innerHTML = todosHeader;
  selectors.categoriesList.innerHTML = categoriesHeader;
  const { nameInput, contentInput, categoryInput } = selectors;
  const date = /(\d\d\.\d\d\.\d\d\d\d|\d\.\d\d\.\d\d\d\d|\d\d\/\d\d\/\d\d\d\d|\d\/\d\d\/\d\d\d\d)/g;
  const todo = {
    id: nanoid(10),
    [nameInput.name]: nameInput.value,
    [contentInput.name]: contentInput.value,
    [categoryInput.name]: categoryInput.value,
    archived: false,
    active: true,
    created: new Date().toLocaleString(),
    dates: contentInput.value?.match(date)?.join(', ') || '',
  };
  todos.push(todo);
  renderTodos(selectors.todoList, createTodos(todos));
  renderTodos(selectors.categoriesList, createCategoriesList(todos));
  e.target.reset();
  selectors.addTodoModal.classList.add('is-hidden');
};

export const onEdit = e => {
  e.preventDefault();
  selectors.todoList.innerHTML = todosHeader;
  selectors.categoriesList.innerHTML = categoriesHeader;
  const { editedNameInput, editedContentInput, editedCategoryInput } = selectors;
  const date = /(\d\d\.\d\d\.\d\d\d\d|\d\.\d\d\.\d\d\d\d|\d\d\/\d\d\/\d\d\d\d|\d\/\d\d\/\d\d\d\d)/g;
  itemToEdit.name = editedNameInput.value;
  itemToEdit.category = editedCategoryInput.value;
  itemToEdit.content = editedContentInput.value;
  itemToEdit.dates = editedContentInput.value?.match(date)?.join(', ') || '';
  renderTodos(selectors.todoList, createTodos(todos));
  renderTodos(selectors.categoriesList, createCategoriesList(todos));
  e.target.reset();
  selectors.editgiModal.classList.add('is-hidden');
};

selectors.addTodoForm.addEventListener('submit', onSubmit);
selectors.editModal.addEventListener('submit', onEdit);

selectors.todoList.addEventListener('click', itemButtonsClickHandler);
selectors.archivedTodosList.addEventListener('click', itemButtonsClickHandler);
selectors.openAddTodoButton.addEventListener('click', e => {
  selectors.addTodoModal.classList.remove('is-hidden');
});
selectors.closeAddTodoButton.addEventListener('click', e => {
  selectors.addTodoModal.classList.add('is-hidden');
});

selectors.openArchivedButton.addEventListener('click', e => {
  selectors.archivedModal.classList.remove('is-hidden');
});

selectors.closeArchivedButton.addEventListener('click', e => {
  selectors.archivedModal.classList.add('is-hidden');
});

selectors.closeEditButton.addEventListener('click', e => {
  selectors.editModal.classList.add('is-hidden');
});
