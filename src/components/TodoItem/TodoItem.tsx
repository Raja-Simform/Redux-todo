import { List, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

type TodoItemProps = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

export default function TodoItem({ id, text, done, date }: TodoItemProps) {
  return (
    <List.Item
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: 8,
      }}
    >
      <Link
        to={`/todos/${id}`}
        style={{
          fontSize: 16,
          textDecoration: done ? "line-through" : "none",
          color: done ? "#888" : undefined,
        }}
      >
        {text}
      </Link>
      <Text type="secondary">(Added: {date})</Text>
    </List.Item>
  );
}
