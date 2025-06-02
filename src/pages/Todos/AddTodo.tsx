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
    <div className="flex justify-center">
      <Card className="w-xl mx-auto my-auto rounded-lg" hoverable>
        <Space direction="vertical" size="large" className="w-full">
          <TodoCount />
          <Title level={3} className="mb-0">
            Add New Todo
          </Title>
          <form onSubmit={handleSubmit}>
            <Space.Compact size="large" className="w-full">
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
    </div>
  );
}
