import {
    type Action,
    type Todo,
} from "./TodoReducer";
import {
    type Dispatch,
    type ReactNode,
} from "react";
export interface TodoContextType {
  todos: Todo[];
  dispatch: Dispatch<Action>;
}
export interface TodoProviderProps {
  children: ReactNode;
}