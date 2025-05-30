import { Link } from "react-router-dom";
import { Switch } from "antd";

import { useTheme } from "../../store/ThemeContext/ThemeContext";
export default function Navbar() {
  const{darkMode,toggleMode}=useTheme();
  function onChange(){
    toggleMode();
  }
  return (
    <div className={`flex justify-between p-8 text-2xl ${
      darkMode ? "bg-[#3F5EFB] text-white" : "bg-gray-100 text-black"
    }`}>
      <nav className="flex   items-center justify-center gap-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/todos" className="hover:underline">
          Todos
        </Link>
      </nav>
      <Switch checked={darkMode} onChange={onChange} />
    </div>
  );
}


