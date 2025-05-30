import { v4 as uuidv4 } from "uuid";
export interface Todo {
  id: string;
  text: string;
  done: boolean;
  date: string;
}
export type Action =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "DONE_TODO"; payload: { id: string } }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } };
export function todoReducer(state: Todo[], action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      // alert(state);
      return [
        ...state,
        {
          id: uuidv4(),
          text: action.payload.text,
          done: false,
          date: new Date().toLocaleDateString(),
        },
      ];
    case "DONE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
      );
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return state;
  }
}
export const initialTodo = [
  {
    id: uuidv4(),
    text: "learn react",
    done: false,
    date: new Date().toLocaleDateString(),
  },
];
