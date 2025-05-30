import { type ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams, Outlet } from "react-router-dom";
import TodoCount from "../../components/TodoCount/TodoCount";
import { useTheme } from "../../store/ThemeContext/ThemeContext";
import { useAppSelector, type RootState } from "../../store/TodoStore";
import { Button, Input, List, Space, Typography } from "antd";

const { Text, Title } = Typography;
export default function Todos() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const todos = useAppSelector((state: RootState) => state.todos);
  const search = searchParam.get("search") || "";
  const filterTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );
  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value) {
      setSearchParam({ search: value });
    } else {
      setSearchParam({});
    }
  }
  return (
    <div
      style={{
        maxWidth: 768,
        margin: "2rem auto",
        padding: 24,
        borderRadius: 8,
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        color: darkMode ? "#f0f0f0" : "#000",
      }}
    >
      <Title level={2} style={{ marginBottom: 24, color: "#f0f0f0" }}>
        Welcome to my todo
      </Title>
      <TodoCount />
      <Space
        style={{ width: "100%", marginBottom: 24 }}
        align="start"
        size="middle"
      >
        <Input
          placeholder="Search Todos..."
          value={search}
          onChange={handleSearchChange}
          allowClear
          size="large"
        />
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/todos/new")}
        >
          Add
        </Button>
      </Space>

      {filterTodos.length === 0 ? (
        <Text style={{ display: "block", textAlign: "center" }}>
          No todos found.
        </Text>
      ) : (
        <List
          bordered={!darkMode}
          dataSource={filterTodos}
          renderItem={(todo) => (
            <List.Item
              extra={<Text type="secondary">(Added: {todo.date})</Text>}
            >
              <Link
                to={`/todos/${todo.id}`}
                style={{
                  fontSize: 18,
                  color: todo.done ? "#888" : darkMode ? "#f0f0f0" : "#000",
                  textDecoration: todo.done ? "line-through" : "none",
                  transition: "color 0.3s",
                }}
              >
                {todo.text}
              </Link>
            </List.Item>
          )}
        />
      )}
      <Outlet />
    </div>
  );
}
