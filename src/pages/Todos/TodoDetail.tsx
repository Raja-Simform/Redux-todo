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
import { Button, Input, message, Space, Typography, Card } from "antd";

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
      <Typography.Paragraph
        type="danger"
        style={{ textAlign: "center", marginTop: 32, fontWeight: "600" }}
      >
        Todo not found
      </Typography.Paragraph>
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
    <Card
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        color: darkMode ? "#f0f0f0" : "#000",
      }}
    >
      <TodoCount />
      <Title
        level={3}
        style={{ marginBottom: 24, color: darkMode ? "#f0f0f0" : "#000" }}
      >
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
            style={{
              backgroundColor: "#141414",
              color: "#f0f0f0",
            }}
          />
        ) : todo.done ? (
          <Text delete type="secondary">
            {todo.text}
          </Text>
        ) : (
          <Text>{todo.text}</Text>
        )}
        <Space wrap>
          <Button onClick={toggleDone} type={todo.done ? "default" : "primary"}>
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
          style={{ marginTop: 24 }}
        >
          Back to Todos
        </Button>
      </Space>
    </Card>
  );
}
