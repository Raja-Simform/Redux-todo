import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";

export default function AddTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("Context Not found");
  }
  const { dispatch } = context;
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Todo text cannot be empty");
      return;
    }
    dispatch({ type: "ADD_TODO", payload: { text } });
    setText("");
    navigate("/todos");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-8">
      <TodoCount />
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add New Todo</h3>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter todo text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
         className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Add
        </button>
      </form>
      <button
        onClick={() => navigate("/todos")}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Back to Todos
      </button>
    </div>
  );
}
