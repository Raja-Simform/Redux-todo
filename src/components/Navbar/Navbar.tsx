import { Link } from "react-router-dom";
import { Switch, Space } from "antd";
import { useTheme } from "../../store/ThemeContext/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleMode } = useTheme();
  function onChange() {
    toggleMode();
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 32,
        fontSize: 24,
        backgroundColor: darkMode ? "#3F5EFB" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        alignItems: "center",
      }}
    >
      <nav>
        <Space size="large" align="center">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to="/about"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            About
          </Link>
          <Link
            to="/todos"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Todos
          </Link>
        </Space>
      </nav>
      <Switch checked={darkMode} onChange={onChange} />
    </div>
  );
}
