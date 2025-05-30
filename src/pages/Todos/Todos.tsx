import { useContext, type ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams, Outlet } from "react-router-dom";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";

export default function Todos() {
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
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <h2  className="text-3xl font-bold mb-4 text-gray-900">Welcome to my todo</h2>
      <TodoCount />
      <div className="flex items-center gap-4 mb-6">
        <input type="text" value={search} onChange={handleSearchChange} placeholder="Search Tdods..." className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition" onClick={() => navigate("/todos/new")}>Add</button>
      </div>
      {filterTodos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        <ul className="space-y-3">
          {filterTodos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
              <Link to={`/todos/${todo.id}`} className={`text-lg ${
                  todo.done ? "line-through text-gray-400" : "text-gray-800"
                } hover:text-green-600 transition`}>
                {todo.done ? <s>{todo.text}</s> : todo.text}
              </Link>{" "}
              <small className="text-gray-500">(Added: {todo.date})</small>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}
