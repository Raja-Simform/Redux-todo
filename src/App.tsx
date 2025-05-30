import "./App.css";
import { TodoProvider } from "./store/TodoContext";
import { Router } from "./components/Route/Router";
import { ThemeProvider } from "./store/ThemeContext/ThemeContext";

function App() {
  return (
    <div >
      <TodoProvider>
        <ThemeProvider>
        <Router />
        </ThemeProvider>
     
      </TodoProvider>
    </div>
  );
}

export default App;

