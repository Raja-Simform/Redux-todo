import { Link } from "react-router-dom";

type TodoItemProps = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};
export default function TodoItem({ id, text, done, date }: TodoItemProps) {
  return (
    <li key={id} className={`flex justify-between items-center border-b pb-2 `}>
      <Link
        to={`/todos/${id}`}
        className={`text-lg hover:text-green-600 transition `}
      >
        {done ? <s>{text}</s> : text}
      </Link>{" "}
      <small>(Added: {date})</small>
    </li>
  );
}
