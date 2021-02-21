export const increment = () => {
  return {
    type: "INCREMENT",
  };
};
export const decrement = () => {
  return {
    type: "DECRIMENT",
  };
};
export const login = () => {
  return {
    type: "LOGIN",
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const openlog = () => {
  return {
    type: "OPENLOGIN",
  };
};

export const closelogin = () => {
  return {
    type: "CLOSELOGIN",
  };
};
export const setuserinfo = (data) => {
  return {
    type: "SETDATA",
    payload: data,
  };
};
export const setlog = (action) => {
  return {
    type: "SETTYPE",
    payload: action,
  };
};
export const changepage = (action) => {
  return {
    type: "PAGE",
    payload: action,
  };
};
