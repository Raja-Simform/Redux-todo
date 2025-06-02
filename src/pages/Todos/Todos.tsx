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
    <div className="max-w-2xl mx-auto my-8 p-6 rounded-lg bg-inherit text-inherit">
      <Title level={2} className="mb-6">
        Welcome to my todo
      </Title>
      <TodoCount />
      <Space align="start" size="middle" className="max-w-2xl mb-6">
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
        <Text className=" block text-center">No todos found.</Text>
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
                className={`text-lg ${
                  todo.done ? "text-gray-400 line-through" : "text-inherit"
                }`}
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
