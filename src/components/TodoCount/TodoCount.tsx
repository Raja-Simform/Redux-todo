import { Divider, Typography } from "antd";
import { useAppSelector, type RootState } from "../../store/TodoStore";

const { Text } = Typography;

export default function TodosNavbar() {
  const todos = useAppSelector((state: RootState) => state.todos);

  return (
    <>
      <Divider className="mb-4 border-inherit" />
      <Text strong className="p-2 text-inherit block">
        Total Todos: {todos.length}
      </Text>
    </>
  );
}
