import { createContext, useReducer } from "react";
import { todoReducer, initialTodo } from "./TodoReducer";
import {
  type TodoContextType,
  type TodoProviderProps,
} from "./TodoContextTypes";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodo);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
