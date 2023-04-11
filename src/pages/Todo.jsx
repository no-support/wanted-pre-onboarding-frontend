import axios from "axios";
import { createTodo, getTodos, updateTodo } from "../apis/todo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasToken } from "../utils/hasToken";
import TodoEdit from "../components/Todo/TodoEdit";
import TodoList from "../components/Todo/TodoList";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState();

  useEffect(() => {
    if (!hasToken()) {
      navigate("/signin");
      return;
    }
    const cancelToken = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const res = await getTodos(cancelToken);
        setTodos(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          const { code, message, name } = err;
          console.log(message);
          return;
        }
        const { error, message, statusCode } = err.response.data;
        alert(message); // canceled
      }
    };
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const create = async (inputValue) => {
    try {
      await createTodo(inputValue);
      const todos = await getTodos();
      setTodos(todos.data);
    } catch (err) {
      console.log(err);
    }
  };

  const update = async (todo) => {
    try {
      await updateTodo(todo);
      const todos = await getTodos();
      setTodos(todos.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Todo">
      <TodoEdit create={create} />
      <TodoList todos={todos} update={update} />
    </div>
  );
};
export default Todo;
