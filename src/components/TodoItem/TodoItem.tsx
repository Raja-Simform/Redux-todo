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
    <List.Item className="flex justify-center items-center border-b-1-white pb-32">
      <Link
        to={`/todos/${id}`}
        className={`text-base ${
          done ? "line-through text-gray-500" : "text-inherit"
        }`}
      >
        {text}
      </Link>
      <Text type="secondary">(Added: {date})</Text>
    </List.Item>
  );
}
