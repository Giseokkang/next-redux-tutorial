import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addTodo, removeTodo, toggleTodo } from "../modules/todo";

const useTodoActions = () => {
  const dispatch = useDispatch();

  const onAddTodo = useCallback((text: string) => dispatch(addTodo(text)), [
    dispatch
  ]);
  const onRemoveTodo = useCallback((id: number) => dispatch(removeTodo(id)), [
    dispatch
  ]);
  const onToggleTodo = useCallback((id: number) => dispatch(toggleTodo(id)), [
    dispatch
  ]);

  return {
    onAddTodo,
    onRemoveTodo,
    onToggleTodo
  };
};

export default useTodoActions;
