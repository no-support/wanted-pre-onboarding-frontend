import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasToken } from "../utils/hasToken";
import TodoItem from "../components/TodoItem";

const Todo = () => {
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [input, setInput] = useState("");

  const [hasCreate, setHasCreate] = useState(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    hasToken() ? getTodos(cancelToken) : navigate("/signin");
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const createTodo = (cancelToken) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/" + "todos",
        {
          todo: input,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        setInput("");
        setHasCreate(false);
        getTodos(cancelToken);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          const { code, message, name } = err;
          console.log(message);
          return;
        }
        const { error, message, statusCode } = err.response.data;
        console.log(error, message, statusCode);
        alert(message);
      });
  };

  useEffect(() => {
    if (!hasCreate) return;
    const cancelToken = axios.CancelToken.source();
    createTodo(cancelToken);
    return () => {
      cancelToken.cancel();
    };
  }, [hasCreate]);

  const handleCreate = () => {
    setHasCreate(true);
  };

  const getTodos = (cancelToken) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/" + "todos", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          const { code, message, name } = err;
          console.log(message);
          return;
        }
        const { error, message, statusCode } = err.response.data;
        console.log(error, message, statusCode);
        alert(message);
      });
  };

  return (
    <div className="Todo">
      <input
        type="text"
        data-testid="new-todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button data-testid="new-todo-add-button" onClick={handleCreate}>
        추가
      </button>

      <ul>
        {data &&
          data.map((it) => (
            <TodoItem key={it.id} todo={it} getTodos={getTodos} />
          ))}
      </ul>
    </div>
  );
};
export default Todo;
