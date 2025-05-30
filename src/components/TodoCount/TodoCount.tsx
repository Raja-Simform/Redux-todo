import  { useContext } from "react";
import { TodoContext } from "../../store/TodoContext";
export default function TodosNavbar() {

  const context= useContext(TodoContext);
  if(!context){
    throw Error("raja-4")
  }
  const { todos } =context;
  return (
    <div
      style={{
        padding: "0.5rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem",
        fontWeight: "bold",
      }}
    >
      Total Todos: {todos.length}
    </div>
  );
}
