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
      className={`max-w-3xl mx-auto p-6 mt-8 rounded ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Title level={2} className="mb-4">
        Welcome to my todo
      </Title>
      <TodoCount />
      <Space
        className="mb-6"
        style={{ width: "100%" }}
        align="start"
        size="middle"
      >
        <Input
          placeholder="Search Todos..."
          value={search}
          onChange={handleSearchChange}
          allowClear
          size="large"
          className={darkMode ? "bg-gray-800 text-gray-100" : ""}
          style={{ flexGrow: 1 }}
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
        <Text className="block text-center">No todos found.</Text>
      ) : (
        <List
          bordered={!darkMode}
          dataSource={filterTodos}
          renderItem={(todo) => (
            <List.Item
              className={darkMode ? "bg-gray-900 border-gray-700" : ""}
              extra={<Text type="secondary">(Added: {todo.date})</Text>}
            >
              <Link
                to={`/todos/${todo.id}`}
                className={`text-lg transition ${
                  todo.done
                    ? "line-through text-gray-500"
                    : darkMode
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                {todo.done ? <s>{todo.text}</s> : todo.text}
              </Link>
            </List.Item>
          )}
        />
      )}

      <Outlet />
    </div>
  );
}
