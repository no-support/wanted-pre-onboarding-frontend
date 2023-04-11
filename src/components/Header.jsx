import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <ul>
        <li>
          <Link to={"/"}>HOME</Link>
        </li>
        <li>
          <Link to={"/signup"}>signup</Link>
        </li>
        <li>
          <Link to={"/signin"}>signin</Link>
        </li>
        <li>
          <Link to={"/todo"}>todo</Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
