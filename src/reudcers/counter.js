const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECRIMENT":
      return state - 1;
    default:
      return state;
  }
};
