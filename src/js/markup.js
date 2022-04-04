import { todoList } from './selectors';
import { todos } from '../data/todos';

const createMarkup = items =>
  items
    .map(
      ({ name, created, category, content }) =>
        `<tr class="todo">
    <td class="todo__field">${name}</td>
    <td class="todo__field">${created}</td>
    <td class="todo__field">${category}</td>
    <td class="todo__field">${content}</td>
    </tr>`,
    )
    .join('');

const renderMarkup = (targetElement, elementToRender) =>
  targetElement.insertAdjacentHTML('beforeend', elementToRender);

console.log(createMarkup(todos));

renderMarkup(todoList, createMarkup(todos));
