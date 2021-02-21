import counter from "./counter";
import islogged from "./islogged";
import { combineReducers } from "redux";
import page from "./page";
import userinfo from "./userinfo";

const allreducer = combineReducers({
  counter: counter,
  logged: islogged,
  pagetype: page,
  userinfo: userinfo,
});
export default allreducer;
