import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TodoCount from "../../components/TodoCount/TodoCount";
import { addTodo } from "../../store/TodoSlice";
import { useAppDispatch } from "../../store/TodoStore";
import { Button, Card, Input, Space, Typography } from "antd";

const { Title } = Typography;
export default function AddTodo() {
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Todo text cannot be empty");
      return;
    }
    dispatch(addTodo({ text }));
    setText("");
    navigate("/todos");
  }
  return (
    <Card
      style={{ maxWidth: 480, margin: "2rem auto", borderRadius: 8 }}
      hoverable
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <TodoCount />
        <Title level={3} style={{ marginBottom: 0 }}>
          Add New Todo
        </Title>
        <form onSubmit={handleSubmit}>
          <Space.Compact style={{ width: "100%" }} size="large">
            <Input
              placeholder="Enter todo text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="large"
              allowClear
              autoFocus
            />
            <Button type="primary" htmlType="submit" size="large">
              Add
            </Button>
          </Space.Compact>
        </form>
        <Button onClick={() => navigate("/todos")} size="large" danger block>
          Back to Todos
        </Button>
      </Space>
    </Card>
  );
}
