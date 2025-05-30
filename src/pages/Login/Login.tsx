import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
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
      <Button
        type="primary"
        onClick={handleLogin}
        loading={loading}
        disabled={loading}
        size="large"
      >
        Login
      </Button>
    </div>
  );
}
