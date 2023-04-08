import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/signup"}>signup</Link>
      <br />
      <Link to={"/signin"}>signin</Link>
      <br />
      <Link to={"/todo"}>todo</Link>
    </div>
  );
};
export default Header;
