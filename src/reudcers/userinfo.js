let intialstate = { isstaff: false };

const userinfo = (state = intialstate, action) => {
  switch (action.type) {
    case "SETDATA":
      return (state = action.payload);
    default:
      return state;
  }
};

export default userinfo;
