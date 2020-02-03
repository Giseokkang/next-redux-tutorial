import produce from "immer";
import {
  ActionType,
  createReducer,
  createStandardAction
} from "typesafe-actions";
// action

const ADD_TODO = "todo/ADD_TODO";
const TOGGLE_TODO = "todo/TOGGLE_TODO";
const REMOVE_TODO = "todo/REMOVE_TODO";

// actionCreators

export const todoActions = {
  addTodo: createStandardAction(ADD_TODO)<string>(),
  toggleTodo: createStandardAction(TOGGLE_TODO)<number>(),
  removeTodo: createStandardAction(REMOVE_TODO)<number>()
};

const actions = {
  addTodo: todoActions.addTodo,
  toggleTodo: todoActions.toggleTodo,
  removeTodo: todoActions.removeTodo
};

type TodoActions = ActionType<typeof actions>;

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoState = Todo[];

const initialState: TodoState = [];

// reducer

const todo = createReducer<TodoState, TodoActions>(initialState, {
  [ADD_TODO]: (state, action) =>
    produce(state, draft => {
      draft.push({
        id: state.length === 0 ? 1 : state[state.length - 1].id + 1,
        text: action.payload,
        done: false
      });
    }),
  [TOGGLE_TODO]: (state, action) =>
    produce(state, draft => {
      draft.map(todo =>
        todo.id === action.payload ? (todo.done = !todo.done) : todo.done
      );
    }),
  [REMOVE_TODO]: (state, action) =>
    produce(state, draft => {
      const index = draft.findIndex((v, i) => i === action.payload);
      draft.splice(index, 1);
    })
});

export default todo;
