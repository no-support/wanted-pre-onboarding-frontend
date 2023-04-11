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

  // 질문: handleDelete에서 remove를 성공하면 알아서 상태가 변경되어서
  // TodoList에서 해당 아이템이 사라지는데, 왜 여기서
  // isDeleted를 true로 바꿔줘야 새로고침을 하지 않고 화면상에서 사라지는지 모르겠습니다.
  if (isDeleted) {
    return null;
  }

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
