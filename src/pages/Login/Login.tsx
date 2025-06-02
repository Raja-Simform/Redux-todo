import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { TOKEN } from "../../constants/constants";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("token", TOKEN);
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        type="primary"
        size="large"
        onClick={handleLogin}
        className="min-w-28 h-10"
      >
        Login
      </Button>
    </div>
  );
}
