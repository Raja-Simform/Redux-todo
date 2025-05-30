import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
