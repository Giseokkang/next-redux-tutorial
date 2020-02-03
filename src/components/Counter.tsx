import React from "react";
import useCounter from "../hooks/useCounter";

const Counter = () => {
  const { count, onIncrease, onDecrease, onIncreaseBy } = useCounter();
  return (
    <div>
      <span>{count}</span>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
};

export default Counter;
