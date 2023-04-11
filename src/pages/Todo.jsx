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
    case "INIT":
    case "CREATE":
    case "UPDATE":
    case "REMOVE":
      return action.data;
    default:
      return state;
  }
};

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

const Todo = () => {
  const navigate = useNavigate();
  // const [todos, setTodos] = useState();
  const [todos, dispatch] = useReducer(reducer);

  // 질문: dependencie 배열에 navigate를 넣으라는 권고가 뜨는데, 왜 넣어야 하는지 모르겠습니다.
  useEffect(() => {
    if (!hasToken()) {
      navigate("/signin");
      return;
    }
    const cancelToken = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const res = await getTodos(cancelToken);
        dispatch({ type: "INIT", data: res.data });
        // setTodos(res.data);
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

  // 질문: 왜 useCallback을 썼는데도 초기 렌더링 시 TodoEdit이 두 번 호출되며,
  // 수정 시(체크박스 선택 혹은 수정 작성 후 제출)에도 한 번 호출되는지 모르겠습니다.
  const create = useCallback(async (inputValue) => {
    try {
      await createTodo(inputValue);
      const todos = await getTodos();
      dispatch({ type: "CREATE", data: todos.data });
      // setTodos(todos.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const update = useCallback(async (todo) => {
    try {
      await updateTodo(todo);
      const todos = await getTodos();
      dispatch({ type: "UPDATE", data: todos.data });
      // setTodos(todos.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      const todos = await getTodos();
      dispatch({ type: "REMOVE", data: todos.data });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { create, update, remove };
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
