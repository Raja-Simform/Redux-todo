import "./App.css";
import { TodoProvider } from "./store/TodoContext";
import { Router } from "./components/Route/Router";

function App() {
  return (
    <div >
      <TodoProvider>
        <Router />
      </TodoProvider>
    </div>
  );
}

export default App;

