import { useTheme } from "../../store/ThemeContext/ThemeContext"

export default function Home(){
  //added theme here using themprovider and using custom hook useTheme
  const{darkMode}=useTheme();
  return (<div className={darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}>
    <h1>Welcome to home page</h1>
  </div>)
}