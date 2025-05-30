import { useContext, type ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams, Outlet } from "react-router-dom";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";
import { useTheme } from "../../store/ThemeContext/ThemeContext";

export default function Todos() {
  const{darkMode}=useTheme();
  const context = useContext(TodoContext);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  if (!context) {
    throw Error("Context Not found");
  }
  const { todos } = context;

  const search = searchParam.get("search") || "";
  const filterTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value) {
      setSearchParam({ search: value });
    } else {
      setSearchParam({});
    }
  }

  return (
    <div
      className={`max-w-3xl mx-auto p-6 mt-8 rounded ${
        darkMode
          ? "bg-gray-900 text-gray-100" // dark background and light text
          : "bg-white text-gray-900" // light background and dark text
      }`}
    >
      <h2 className="text-3xl font-bold mb-4">Welcome to my todo</h2>
      <TodoCount />
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Todos..."
          className={`flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-indigo-400"
              : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500"
          }`}
        />
        <button
          className={`px-5 py-2 rounded transition ${
            darkMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={() => navigate("/todos/new")}
        >
          Add
        </button>
      </div>
      {filterTodos.length === 0 ? (
        <p className="text-center">No todos found.</p>
      ) : (
        <ul className="space-y-3">
          {filterTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center border-b pb-2 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Link
                to={`/todos/${todo.id}`}
                className={`text-lg hover:text-green-600 transition ${
                  todo.done
                    ? "line-through text-gray-500"
                    : darkMode
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                {todo.done ? <s>{todo.text}</s> : todo.text}
              </Link>{" "}
              <small>(Added: {todo.date})</small>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}