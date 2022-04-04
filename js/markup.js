// import { todoList } from './selectors';
// import { todos } from '../data/todos';

export const createMarkup = items =>
  items.map(({ name, created, category, content }) => {
    return `<ul class="todo">
    <li class="todo__field">${name}</li>
    <li class="todo__field">${created}</li>
    <li class="todo__field">${category}</li>
    <li class="todo__field">${content}</li>
    </ul>`;
  });

export const renderMarkup = (targetElement, elementToRender) =>
  targetElement.append(elementToRender);

// renderMarkup(todoList, createMarkup(todos));
