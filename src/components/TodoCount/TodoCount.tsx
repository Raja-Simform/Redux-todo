import { Divider, Typography } from "antd";
import { useTheme } from "../../store/ThemeContext/ThemeContext";
import { useAppSelector, type RootState } from "../../store/TodoStore";

const { Text } = Typography;

export default function TodosNavbar() {
  const todos = useAppSelector((state: RootState) => state.todos);
  const { darkMode } = useTheme();

  return (
    <>
      <Divider
        style={{
          marginBottom: "1rem",
          borderColor: darkMode ? "#ffffff33" : "#00000033",
        }}
      />
      <Text
        strong
        style={{
          padding: "0.5rem",
          color: darkMode ? "white" : "black",
          display: "block",
        }}
      >
        Total Todos: {todos.length}
      </Text>
    </>
  );
}
