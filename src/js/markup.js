import { todoList } from './selectors';
import { todos } from '../data/todos';
import { onSubmit } from './functions';
import { selectors } from './selectors';

export const createMarkup = items => {
  return items
    .map(
      ({ id, name, created, category, content, deadline }, idx) =>
        `<tr class="todo">
    <td class="todo__field">${name}</td>
    <td class="todo__field">${created}</td>
    <td class="todo__field">${category}</td>
    <td class="todo__field">${content}</td>
    <td class="todo__field">${deadline}</td>
    <td class="todo__field">
    <button type="button" class="archive-item">archive</button>
    <button type="button" id="${idx}" class="delete-item">delete</button></td>
    </tr>`,
    )
    .join('');
};

export const renderMarkup = (targetElement, elementToRender) =>
  targetElement.insertAdjacentHTML('beforeend', elementToRender);

renderMarkup(selectors.todoList, createMarkup(todos));
