import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("token", "7");
    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        type="primary"
        size="large"
        onClick={handleLogin}
        style={{ minWidth: 120, height: 40 }}
      >
        Login
      </Button>
    </div>
  );
}
