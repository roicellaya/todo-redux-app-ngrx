import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje'),
  new Todo('Robar escudo'),
];

const _todoReducer = createReducer(
  initialState,
  on(actions.crear, (state, { text }) => [...state, new Todo(text)]),
  
  on(actions.toggle, (state, { id }) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      } else {
        return todo;
      }
    });
  }),

  on(actions.edit, (state, { id, text }) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          text: text
        };
      } else {
        return todo;
      }
    });
  }),

  on(actions.deleter, (state, { id }) => state.filter(todo => todo.id !== id)),

  on(actions.toggleAll, (state, { completed }) => {
    return state.map(todo => {
      return {
        ...todo,
        completed: completed
      };
    })
  }),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
