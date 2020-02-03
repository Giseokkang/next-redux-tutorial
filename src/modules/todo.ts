import produce from "immer";

// action

const ADD_TODO = "todo/ADD_TODO" as const;
const TOGGLE_TODO = "todo/TOGGLE_TODO" as const;
const REMOVE_TODO = "todo/REMOVE_TODO" as const;

// actionCreators

type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

export const addTodo = (text: string) => ({ type: ADD_TODO, payload: text });
export const toggleTodo = (id: number) => ({ type: TOGGLE_TODO, payload: id });
export const removeTodo = (id: number) => ({ type: REMOVE_TODO, payload: id });

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoState = Todo[];

const initialState: TodoState = [
  { id: 1, text: "타입스크립트 배우기", done: true },
  { id: 2, text: "타입스크립트와 리덕스 함께 사용해보기", done: true },
  { id: 3, text: "투두리스트 만들기", done: false }
];

// reducer

const todo = (state: TodoState = initialState, action: TodoAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_TODO: {
        draft.push({
          id: state.length === 0 ? 1 : state[state.length - 1].id + 1,
          text: action.payload,
          done: false
        });
        break;
      }

      case TOGGLE_TODO: {
        draft.map(todo =>
          todo.id === action.payload ? (todo.done = !todo.done) : todo.done
        );
        break;
      }

      case REMOVE_TODO: {
        const index = draft.findIndex((v, i) => i === action.payload);
        draft.splice(index, 1);
        break;
      }
      default:
        return state;
    }
  });
};

// export

export default todo;
