import { Link } from "react-router-dom";
import { Switch, Space } from "antd";
import { useTheme } from "../../store/ThemeContext/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleMode } = useTheme();
  function onChange() {
    toggleMode();
  }
  return (
    <div className="flex justify-between p-6 text-3xl bg-inherit text-inherit items-center">
      <nav>
        <Space size="large" align="center">
          <Link to="/" className="text-inherit ">
            Home
          </Link>
          <Link to="/about" className="text-inherit ">
            About
          </Link>
          <Link to="/todos" className="text-inherit ">
            Todos
          </Link>
        </Space>
      </nav>
      <Switch checked={darkMode} onChange={onChange} />
    </div>
  );
}
