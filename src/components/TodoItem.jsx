import axios from "axios";
import { useEffect, useState } from "react";

const TodoItem = ({ todo: item, getTodos }) => {
  const { id, todo, isCompleted, userId } = item;
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(todo);

  const [hasCheck, setHasCheck] = useState(null);
  const [hasDelete, setHasDelete] = useState(false);
  const [hasModify, setHasModify] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(todo);
  };

  const handleCheck = () => {
    // updateTodo(todo, !isCompleted);
    setHasCheck((prev) => !prev);
  };

  const handleModify = () => {
    // updateTodo(localContent, isCompleted);
    // toggleEdit();
    setHasModify((prev) => !prev);
    toggleEdit();
  };

  useEffect(() => {
    if (hasCheck === null) return;
    const cancelToken = axios.CancelToken.source();

    updateTodo(todo, !isCompleted, cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, [hasCheck]);

  useEffect(() => {
    if (!hasModify) return;
    const cancelToken = axios.CancelToken.source();

    updateTodo(localContent, isCompleted, cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, [hasModify]);

  const updateTodo = (todo, isCompleted, cancelToken) => {
    axios
      .put(
        process.env.REACT_APP_API_URL + "/" + "todos/" + id,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        console.log(res);
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

  const handleDelete = () => {
    setHasDelete(true);
  };

  const deleteTodo = (cancelToken) => {
    axios
      .delete(process.env.REACT_APP_API_URL + "/" + "todos/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        console.log(res);
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
    if (!hasDelete) return;
    const cancelToken = axios.CancelToken.source();

    deleteTodo(cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, [hasDelete]);

  return (
    <li className="TodoItem">
      <label>
        <input
          type="checkbox"
          checked={isCompleted ? true : false}
          onChange={handleCheck}
        />
        {isEdit ? (
          <input
            type="text"
            data-testid="modify-input"
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          <span>{todo}</span>
        )}
      </label>

      {isEdit ? (
        <>
          <button data-testid="submit-button" onClick={handleModify}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={handleQuitEdit}>
            취소
          </button>
        </>
      ) : (
        <>
          <button data-testid="modify-button" onClick={toggleEdit}>
            수정
          </button>
          <button data-testid="delete-button" onClick={handleDelete}>
            삭제
          </button>
        </>
      )}
    </li>
  );
};
export default TodoItem;
