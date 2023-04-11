import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "../../pages/Todo";

const TodoList = () => {
  const todos = useContext(TodoStateContext);
  return (
    <div className="TodoList">
      {todos === undefined && <div>로딩 중</div>}
      <ul>
        {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
};
export default TodoList;
