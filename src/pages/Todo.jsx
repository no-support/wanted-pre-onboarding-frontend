import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasToken } from "../utils/hasToken";

const Todo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    hasToken() || navigate("/signin");
  }, []);

  return <div className="Todo">Todo</div>;
};
export default Todo;
