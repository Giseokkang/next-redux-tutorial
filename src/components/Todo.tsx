import React, { useState } from "react";
import useTodos from "../hooks/useTodo";
import useTodoActions from "../hooks/useTodoActions";

const Todo = () => {
  const [value, setValue] = useState("");
  const todos = useTodos();
  const { onAddTodo, onRemoveTodo, onToggleTodo } = useTodoActions();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(value);
    setValue("");
    console.log(todos);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="write something"
          value={value}
        ></input>
      </form>
      <ul>
        {todos &&
          todos.length > 0 &&
          todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.done ? `${todo.text} < 끝났음` : todo.text}</span>
              <button onClick={() => onToggleTodo(todo.id)}>
                {todo.done ? "취소" : "완료"}
              </button>
              <button onClick={() => onRemoveTodo(todo.id)}>삭제하기</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
