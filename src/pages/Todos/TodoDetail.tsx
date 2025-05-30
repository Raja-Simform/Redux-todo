import { useState } from "react";
import TodoCount from "../../components/TodoCount/TodoCount";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../store/ThemeContext/ThemeContext";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../store/TodoStore";
import { doneTodo, editTodo } from "../../store/TodoSlice";
import { Button, Input, message, Space, Typography } from "antd";

const { Text, Title } = Typography;

export default function TodoDetail() {
  const todos = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();
  const { darkMode } = useTheme();
  const { id } = useParams<{ id: string }>();
  const todoId = id ?? "";
  const todo = todos.find((t) => t.id === todoId);
  const [editText, setEditText] = useState(todo?.text || "");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!todo) {
    return (
      <Text type="danger" className="block text-center mt-8 font-semibold">
        Todo not found
      </Text>
    );
  }

  function toggleDone() {
    dispatch(doneTodo({ id: todoId }));
  }

  function saveEdit() {
    if (editText.trim() === "") {
      message.error("Text cannot be empty");
      return;
    }
    dispatch(editTodo({ id: todoId, text: editText }));
    setIsEditing(false);
  }

  return (
    <div
      className={`max-w-lg mx-auto rounded p-6 mt-8 shadow-md ${
        darkMode
          ? "bg-gray-900 text-gray-100 shadow-gray-700"
          : "bg-white text-gray-900 shadow-gray-300"
      }`}
    >
      <TodoCount />
      <Title level={3} className="mb-4">
        Todo Detail
      </Title>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Text>
          <strong>ID:</strong> {todo.id}
        </Text>
        <Text>
          <strong>Created At:</strong> {todo.date}
        </Text>
        <Text>
          <strong>Status:</strong> {todo.done ? "Done" : "Not Done"}
        </Text>
        <Text strong>Text:</Text>
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            className={darkMode ? "bg-gray-800 text-gray-100" : ""}
          />
        ) : todo.done ? (
          <Text delete type="secondary">
            {todo.text}
          </Text>
        ) : (
          <Text>{todo.text}</Text>
        )}
        <Space wrap>
          <Button
            onClick={toggleDone}
            type={todo.done ? "default" : "primary"}
            style={
              todo.done
                ? { backgroundColor: "#faad14", color: "#fff" }
                : undefined
            }
          >
            Mark as {todo.done ? "Not Done" : "Done"}
          </Button>

          {isEditing ? (
            <>
              <Button type="primary" onClick={saveEdit}>
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button type="default" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </Space>
        <Button
          onClick={() => navigate("/todos")}
          type="primary"
          danger
          block
          className="mt-6"
        >
          Back to Todos
        </Button>
      </Space>
    </div>
  );
}
