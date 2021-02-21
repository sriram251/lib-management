import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Mainwindow from "./mainpage/mainpage";
import Login from "./authpage/login";
import React from "react";
const Content = () => {
  const states = useSelector((state) => state.logged);
  console.log("it is from app page");
  if (states.isopen === true) {
    return <Login />;
  } else {
    return <Mainwindow />;
  }
};
function App() {
  return (
    <Router>
      <div className="App">
        <Content />
      </div>
    </Router>
  );
}

export default App;
