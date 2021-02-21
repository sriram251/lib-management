import React, { useEffect } from "react";
import Topnav from "./topnav";
import { auth, database } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { login, setuserinfo } from "../actions";
import Portfolio from "./porfolic";
import Profile from "./aboutpage/Aboutpage";
import Library from "./userlib/index";
import { Switch, Route, Link } from "react-router-dom";
import Mylibrary from "./mylibrary";
import Staff from "./staffpage";
function Mainpage() {
  var isstaff = false;
  const dispatch = useDispatch();
  const states = useSelector((state) => state.logged);
  const userinfo = useSelector((state) => state.userinfo);
  useEffect(() => {
    var user = auth.currentUser;
    console.log("this is from use effet");
    if (user !== null || !states.islogged) {
      auth.onAuthStateChanged((data) => {
        console.log(data);
        if (data !== null) {
          let db = database.ref("details/" + user.uid);
          db.on("value", (snap) => {
            dispatch(
              setuserinfo({
                uid: user.uid,
                feild: snap.val(),
                isstaff: snap.val().isstaff,
              })
            );
            dispatch(login());
          });
        }
      });
    }
  }, []);
  if (Object.keys(userinfo).length !== 0) {
    isstaff = userinfo.isstaff;
  }

  return (
    <div>
      <Topnav></Topnav>

      <Switch>
        <Route path="/" exact>
          <Portfolio />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/library">
          <Library />
        </Route>
        {isstaff ? (
          <Route path="/staff">
            <Staff />
          </Route>
        ) : (
          <Route path="/MyBooks">
            <Mylibrary />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default Mainpage;
