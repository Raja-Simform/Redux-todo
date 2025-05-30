import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleMode: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };
  //applied theme globally  through themeprovider
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#1a202c";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("context not found");
  }
  return context;
};
