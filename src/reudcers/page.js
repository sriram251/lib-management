const PAGE = (state = "home", action) => {
  switch (action.type) {
    case "PAGE":
      return (state = action.payload);
    default:
      return state;
  }
};
export default PAGE;
