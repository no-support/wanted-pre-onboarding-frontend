import axios from "axios";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../apis/todo";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { hasToken } from "../utils/hasToken";
import TodoEdit from "../components/Todo/TodoEdit";
import TodoList from "../components/Todo/TodoList";

const reducer = (state, action) => {
  switch (action.type) {
    case "READ":
      return action.data;
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.data.id ? action.data : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

const Todo = () => {
  const navigate = useNavigate();
  const [todos, dispatch] = useReducer(reducer);

  useEffect(() => {
    if (!hasToken()) {
      navigate("/signin");
      return;
    }
    const cancelToken = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const res = await getTodos(cancelToken);
        dispatch({ type: "READ", data: res.data });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(err.message); // canceled
          return;
        }
        alert(err.response.data.message);
      }
    };
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, [navigate]);

  const create = useCallback(async (inputValue) => {
    try {
      const res = await createTodo(inputValue);
      dispatch({ type: "CREATE", data: res.data });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const update = useCallback(async (todo) => {
    try {
      const res = await updateTodo(todo);
      dispatch({ type: "UPDATE", data: res.data });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      dispatch({ type: "REMOVE", id });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { create, update, remove };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={memoizedDispatches}>
        <div className="Todo">
          <TodoEdit />
          <TodoList />
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
export default Todo;
