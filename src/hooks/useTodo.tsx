import { useSelector } from "react-redux";
import { RootState } from "../modules";

const useTodos = () => {
  const todos = useSelector((state: RootState) => state.todo);

  return todos;
};

export default useTodos;
