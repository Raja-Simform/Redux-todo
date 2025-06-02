import { useState } from "react";
import TodoCount from "../../components/TodoCount/TodoCount";
import { useNavigate, useParams } from "react-router-dom";
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
    <div className="flex  justify-center ">
      <Card className="w-lg mx-auto my-8 bg-inherit text-inherit">
        <TodoCount />
        <Title level={3} className="mb-6">
          Todo Detail
        </Title>
        <Space direction="vertical" size="middle" className="w-full">
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
              className="bg-inherit text-inherit"
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
            className="mb-6"
          >
            Back to Todos
          </Button>
        </Space>
      </Card>
    </div>
  );
}
