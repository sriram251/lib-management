import React, { useState } from "react";
import { logout, openlog, changepage } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import "./mainpage.css";
const Setlog = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo);
  const states = useSelector((state) => state.logged);

  if (!states.islogged) {
    return (
      <button
        className="login-button"
        onClick={() => {
          dispatch(openlog());
        }}
      >
        Login
      </button>
    );
  } else {
    console.log("userinf0", userinfo);
    return (
      <div className="username">
        <Avatar src={userinfo.feild.imageurl} className="profileimage" />
      </div>
    );
  }
};
function Mainpage() {
  const states = useSelector((state) => state.logged);
  const userinfo = useSelector((state) => state.userinfo);
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="nav">
      <div className="top-nav">
        {states.islogged ? (
          <IconButton onClick={() => setactive(true)}>
            <MenuIcon className="menu-button" />
          </IconButton>
        ) : (
          <img
            src="https://i.pinimg.com/originals/0d/01/73/0d0173e06b57b2f91611683b35500e47.jpg"
            alt="Smiley face"
            width="42"
            height="42"
            className="logo-img"
          ></img>
        )}
        <h3 className="title">library</h3>
        {<Setlog />}
      </div>
      <Drawer
        anchor="left"
        open={active}
        onClose={() => {
          setactive(false);
        }}
      >
        <List className="sidenavitem">
          <ListItem>MENU</ListItem>
          <Divider />
          <Link to="/" className="sidenavelement">
            <ListItem
              button
              onClick={() => {
                dispatch(changepage("home"));
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {userinfo.isstaff ? (
            <Link to="/staff" className="sidenavelement">
              <ListItem
                button
                onClick={() => {
                  dispatch(changepage("staff"));
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="staff" />
              </ListItem>
            </Link>
          ) : (
            <Link to="/MyBooks" className="sidenavelement">
              <ListItem
                button
                onClick={() => {
                  dispatch(changepage("MyBooks"));
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="MyBooks" />
              </ListItem>
            </Link>
          )}

          <Link to="/library" className="sidenavelement">
            <ListItem
              button
              onClick={() => {
                dispatch(changepage("library"));
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="library" />
            </ListItem>
          </Link>
          <Link to="/profile" className="sidenavelement">
            <ListItem
              button
              onClick={() => {
                dispatch(changepage("profile"));
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="profile" />
            </ListItem>
          </Link>
          <Link to="/" className="sidenavelement">
            <ListItem
              button
              onClick={() => {
                console.log(logout());
                dispatch(logout());
                auth
                  .signOut()
                  .then((user) => {
                    console.log("makelogout", states);
                    setactive(false);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}

export default Mainpage;
