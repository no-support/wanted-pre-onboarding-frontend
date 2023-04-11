import { useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, update }) => {
  useEffect(() => {
    console.log(`useEffect:: TodoList : `);
  });
  return (
    <div className="TodoList">
      {todos === undefined && <div>로딩 중</div>}
      <ul>
        {todos &&
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} update={update} />
          ))}
      </ul>
    </div>
  );
};
export default TodoList;
