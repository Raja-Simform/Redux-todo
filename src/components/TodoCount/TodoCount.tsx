import { useTheme } from "../../store/ThemeContext/ThemeContext";

import { useAppSelector, type RootState } from "../../store/TodoStore";
export default function TodosNavbar() {
  const todos = useAppSelector((state: RootState) => state.todos);

  const { darkMode } = useTheme();
  return (
    <div
      style={{
        padding: "0.5rem",
        borderBottom: "1px solid #000000",
        marginBottom: "1rem",
        fontWeight: "bold",
        color: `${darkMode}?"white":"black"`,
      }}
    >
      Total Todos: {todos.length}
    </div>
  );
}
