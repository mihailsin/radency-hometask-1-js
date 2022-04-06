import { todoList } from './selectors';
import { todos } from '../data/todos';
import { onSubmit } from './functions';
import { selectors } from './selectors';

export const createTodos = items =>
  items
    .map(({ id, name, created, category, content, dates, archived }, idx) => {
      if (!archived)
        return `<tr class="todo">
    <td class="todo__field">${name}</td>
    <td class="todo__field">${created}</td>
    <td class="todo__field">${category}</td>
    <td class="todo__field">${content}</td>
    <td class="todo__field">${dates}</td>
    <td class="todo__field">
    <button type="button" id="${idx}" class="archive-item">archive</button>
    <button type="button" id="${idx}" class="delete-item">delete</button></td>
    </tr>`;
    })
    .join('');

export const renderTodos = (targetElement, elementToRender) =>
  targetElement.insertAdjacentHTML('beforeend', elementToRender);

renderTodos(selectors.todoList, createTodos(todos));

export const createCategoriesList = items => {
  const taskList = items.filter(todo => todo.category === 'Task');
  const ideaList = items.filter(todo => todo.category === 'Idea');
  const thoughtsList = items.filter(todo => todo.category === 'Random Thought');
  const activeTasks = taskList.filter(todo => todo.active);
  const archivedTasks = taskList.filter(todo => todo.archived);
  const activeIdeas = ideaList.filter(todo => todo.active);
  const archivedIdeas = ideaList.filter(todo => todo.archived);
  const activeThoughts = thoughtsList.filter(todo => todo.active);
  const archivedThoughts = thoughtsList.filter(todo => todo.archived);
  return `<tr class="todo">
    <td class="todo__field">Task</td>
    <td class="todo__field">${activeTasks.length}</td>
    <td class="todo__field">${archivedTasks.length}</td>
    </tr>
    <tr class="todo">
    <td class="todo__field">Idea</td>
    <td class="todo__field">${activeIdeas.length}</td>
    <td class="todo__field">${archivedIdeas.length}</td>
    </tr>
    <tr class="todo">
    <td class="todo__field">Random Thought</td>
    <td class="todo__field">${activeThoughts.length}</td>
    <td class="todo__field">${archivedThoughts.length}</td>
    </tr>`;
};
renderTodos(selectors.categoriesList, createCategoriesList(todos));

export const createArchivedTodos = items =>
  items
    .map(({ id, name, created, category, content, dates, archived }, idx) => {
      if (archived)
        return `<tr class="todo">
    <td class="todo__field">${name}</td>
    <td class="todo__field">${created}</td>
    <td class="todo__field">${category}</td>
    <td class="todo__field">${content}</td>
    <td class="todo__field">${dates}</td>
    <td class="todo__field">
    <button type="button" id="${idx}" class="unarchive-item">unarchive</button>
    <button type="button" id="${idx}" class="delete-item">delete</button>
    </tr>`;
    })
    .join('');
renderTodos(selectors.archivedTodosList, createArchivedTodos(todos));
