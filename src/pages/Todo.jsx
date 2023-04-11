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
      return state.filter((todo) => todo.id !== action.data.id);
    default:
      return state;
  }
};

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

const Todo = () => {
  const navigate = useNavigate();
  const [todos, dispatch] = useReducer(reducer);

  // useEffect(() => {
  //   console.log(`useEffect:: Todo : `);
  // });
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
        dispatch({ type: "READ", data: res.data });
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

  // 질문: 왜 useCallback과 useMemo를 썼는데도 초기 렌더링 시 TodoEdit이 두 번 호출되며,
  // 수정 시(체크박스 선택 혹은 수정 작성 후 제출), 삭제 시에도 한 번 호출되는지 모르겠습니다.
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
      dispatch({ type: "REMOVE", data: id });
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
