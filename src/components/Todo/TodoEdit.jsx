import { useContext, useEffect, useState } from "react";
import { useInput } from "../../hooks";
import { TodoDispatchContext } from "../../pages/Todo";

const TodoEdit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { create } = useContext(TodoDispatchContext);

  useEffect(() => {
    console.log(`useEffect:: TodoEdit : `);
  });

  const submitAction = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await create(inputValue);
      setIsLoading(false);
    }
  };

  const { inputValue, updateValue, handleChange, handleSubmit } = useInput(
    { todo: "" },
    submitAction
  );

  return (
    <div className="TodoEdit">
      <form>
        <input
          type="text"
          name="todo"
          data-testid="new-todo-input"
          value={inputValue.todo}
          onChange={handleChange}
        />
        <button
          data-testid="new-todo-add-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "로딩 중" : "추가"}
        </button>
      </form>
    </div>
  );
};
export default TodoEdit;
