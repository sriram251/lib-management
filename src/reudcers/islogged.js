const intitailStatel = {
  islogged: false,
  isopen: false,
  state: "LOGIN",
};
const islogged = (state = intitailStatel, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, islogged: true };
    case "LOGOUT":
      return { ...state, islogged: false };
    case "OPENLOGIN":
      return { ...state, isopen: true };
    case "CLOSELOGIN":
      return { ...state, isopen: false };
    case "SETTYPE":
      return { ...state, state: action.payload };
    default:
      return state;
  }
};
export default islogged;
