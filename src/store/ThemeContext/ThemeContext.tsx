import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useState, type ReactNode } from "react";

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

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode }}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: darkMode ? "#1a202c" : "white",
            color: darkMode ? "white" : "black",
          }}
        >
          {children}
        </div>
      </ConfigProvider>
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
