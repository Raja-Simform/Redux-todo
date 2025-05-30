import  { useContext } from "react";
import { TodoContext } from "../../store/TodoContext";
import { useTheme } from "../../store/ThemeContext/ThemeContext";
export default function TodosNavbar() {

  const context= useContext(TodoContext);
  if(!context){
    throw Error("raja-4")
  }
  const { todos } =context;
  const{darkMode}=useTheme();
  return (
    <div
      style={{
        padding: "0.5rem",
        borderBottom: "1px solid #000000",
        marginBottom: "1rem",
        fontWeight: "bold",
        color:`${darkMode}?"white":"black"`
      }}
    >
      Total Todos: {todos.length}
    </div>
  );
}
