import "./App.css";
import { Provider } from "react-redux";
import { store } from "../src/store/TodoStore";
import { Router } from "./components/Route/Router";
import { ThemeProvider } from "./store/ThemeContext/ThemeContext";

function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
