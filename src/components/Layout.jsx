import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
};
export default Layout;
