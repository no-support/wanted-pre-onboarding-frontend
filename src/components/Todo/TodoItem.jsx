import { deleteTodo } from "../../apis/todo";
import { memo, useContext, useEffect, useState } from "react";
import { TodoDispatchContext } from "../../pages/Todo";

const TodoItem = ({ todo: item }) => {
  useEffect(() => {
    console.log(`useEffect:: TodoItem : ${item.todo}`);
  });

  const { update, remove } = useContext(TodoDispatchContext);

  const { id, todo, isCompleted, userId } = item;

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(todo);
  const [isDeleted, setIsDeleted] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(todo);
  };

  const handleCheck = async () => {
    await update({ ...item, isCompleted: !isCompleted });
  };

  const handleModify = async () => {
    await update({ ...item, todo: localContent });
    toggleEdit();
  };

  const handleDelete = async () => {
    try {
      await remove(id);
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };
  // const handleDelete = async () => {
  //   try {
  //     await deleteTodo(id);
  //     setIsDeleted(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // if (isDeleted) {
  //   return null;
  // }

  return (
    <li className="TodoItem">
      <label>
        <input type="checkbox" checked={isCompleted} onChange={handleCheck} />
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
export default memo(TodoItem);
