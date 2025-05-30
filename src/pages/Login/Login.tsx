import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setLoading(true);
    localStorage.setItem("token", "7");
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
