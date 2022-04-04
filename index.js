import { todoList } from './js/selectors';
import { todos } from './data/todos';
import { createMarkup, renderMarkup } from './js/markup';

renderMarkup(todoList, createMarkup(todos));
