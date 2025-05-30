import { useContext, useState } from "react";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";
import { useNavigate, useParams } from "react-router-dom";
export default function TodoDetail() {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("Context Not found");
  }
  const { todos, dispatch } = context;
  const { id } = useParams<{ id: string }>();
  const todoId = id ?? "";
  const todo = todos.find((t) => t.id === todoId);
  const [editText, setEditText] = useState(todo?.text || "");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!todo) {
    return <p className="text-center text-red-600 mt-8 font-semibold">Todo not found</p>;
  }

  function toggleDone() {
    dispatch({ type: "DONE_TODO", payload: { id: todoId } });
  }
  function saveEdit() {
    if (editText.trim() === "") {
      alert("text cannot be empty");
      return;
    }
    dispatch({ type: "EDIT_TODO", payload: { id: todoId, text: editText } });
    setIsEditing(false);
  }

  return (
    <div
     className="max-w-lg mx-auto bg-white rounded shadow-md p-6 mt-8"
    >
      <TodoCount />
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Todo Detail</h3>
      <p className="mb-2">
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong >Created At:</strong> {todo.date}
      </p>
      <p>
        <strong >Status:</strong> {todo.done ? "Done" : "Not Done"}
      </p>
      <p>
        <strong>Text:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full m-2  px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : todo.done ? (
          <s className="text-gray-500">{todo.text}</s>
        ) : (
          todo.text
        )}
      </p>
      <div className="flex flex-wrap gap-3">
        <button onClick={toggleDone} className={`px-4 py-2 rounded text-white transition ${
            todo.done ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
          }`}>
          Mark as {todo.done ? "Not Done" : "Done"}
        </button>
        {isEditing ? (
          <>
            <button onClick={saveEdit} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition">Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
        )}
      </div>
      <button
        onClick={() => navigate("/todos")}
        className="mt-6 w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Back to Todos
      </button>
    </div>
  );
}
