// actions

const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

// actionCreators

export const increase = () => ({
  type: INCREASE
});
export const decrease = () => ({
  type: DECREASE
});
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff
});

type counterActions =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

// initialState

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0
};

// reducer

const counter = (state = initialState, action: counterActions) => {
  switch (action.type) {
    case INCREASE:
      return {
        count: state.count + 1
      };
    case DECREASE:
      return {
        count: state.count - 1
      };
    case INCREASE_BY:
      return {
        count: state.count + action.payload
      };
    default:
      return state;
  }
};

// export default

export default counter;
