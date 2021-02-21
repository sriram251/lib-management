import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import {
  Slide,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Container,
  TextField,
  IconButton,
  Link,
  Snackbar,
} from "@material-ui/core";
import { setlog, closelogin, login, setuserinfo } from "../actions";
import "./design.css";
import MuiAlert from "@material-ui/lab/Alert";
import { auth, database } from "../firebase";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Logincomp = () => {
  const [message, setmessage] = useState({
    state: false,
    message: "",
    type: "success",
  });
  const dispatch = useDispatch();
  const [Email, setemail] = useState({ email: "", error: "" });
  const [password, setpassword] = useState({ password: "", error: "" });
  function validatefrom() {
    let vaild = true;
    if (Email.email === "") {
      setemail({ ...Email, error: "please enter email" });
      vaild = false;
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(Email.email)) {
        vaild = false;
        console.log("Email not empty");
        setemail({ ...Email, error: "*Please enter valid email-ID." });
      } else {
        setemail({ ...Email, error: "" });
      }
    }
    if (password.password === "") {
      setpassword({ ...password, error: "please enter password" });
      vaild = false;
    } else {
      console.log("password is not empty");
      if (
        !password.password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        console.log("password not ok ");
        vaild = false;
        setpassword({
          ...password,
          error: "*Please enter secure and strong password.",
        });
      } else {
        setpassword({
          ...password,
          error: "",
        });
      }
    }
    return vaild;
  }
  function handlechange(e) {
    if (e.target.name === "email") {
      setemail({ ...Email, email: e.target.value });
    }
    if (e.target.name === "password") {
      setpassword({ ...password, password: e.target.value });
    }
  }
  function handlelogin(e) {
    e.preventDefault();
    if (validatefrom()) {
      auth
        .signInWithEmailAndPassword(Email.email, password.password)
        .then((user) => {
          console.log(user.user.uid);
          let db = database.ref("details/" + user.user.uid);
          db.on("value", (snap) => {
            console.log("this is from login", snap.val());
            dispatch(
              setuserinfo({
                uid: user.uid,
                feild: snap.val(),
                isstaff: snap.val().isstaff,
              })
            );
            dispatch(closelogin());
            dispatch(login());
          });
        })
        .catch((e) => {
          console.log(e);
          setmessage({ state: true, message: e.message, type: "warning" });
        });
      setemail({ email: "", error: "" });
      setpassword({ password: "", error: "" });
      console.log(Email, password);
    }
  }
  function handleClose() {
    setmessage({ state: false, message: "", type: "success" });
  }
  return (
    <Box height="100%" className="authpage">
      <Container maxWidth="xs" className="popscreen">
        <Typography variant="h4" className="heading">
          Login
        </Typography>
        <Divider />
        <form className="component">
          <Grid
            container
            spacing={3}
            alignContent="flex-start"
            direction="column"
          >
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={Email.error !== ""}
                    className="components"
                    variant="filled"
                    label="Email"
                    size="small"
                    name="email"
                    value={Email.email}
                    helperText={Email.error}
                    placeholder="example@gmail.com"
                    onChange={handlechange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={password.error !== ""}
                    fullWidth
                    className="components"
                    variant="filled"
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    value={password.password}
                    helperText={password.error}
                    placeholder="password"
                    onChange={handlechange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid container item xs={6} sm={8} justify="flex-start">
                  <Link>forget password?</Link>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button
                    className="butto component"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handlelogin}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={10}>
              <Grid container item xs={6} justify="flex-start">
                <Link
                  onClick={() => {
                    dispatch(closelogin());
                  }}
                >
                  No thanks?
                </Link>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <Link
                  onClick={() => {
                    dispatch(setlog("SIGNIN"));
                  }}
                >
                  sign in?
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={message.state}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={message.type}>
            {message.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};
const Signincomp = () => {
  const dispatch = useDispatch();
  const [message, setmessage] = useState({
    state: false,
    message: "",
    type: "success",
  });
  const [username, setusername] = useState({ username: "", error: "" });
  const [RegNo, setRegNo] = useState({ RegNo: "", error: "" });
  const [Email, setemail] = useState({ email: "", error: "" });
  const [password, setpassword] = useState({ password: "", error: "" });
  function handleClose() {
    setmessage({ state: false, message: "", type: "success" });
  }
  function validatefrom() {
    let vaild = true;
    if (username.username === "") {
      vaild = false;
      setusername({ ...username, error: "please enter username" });
    } else {
      if (!username.username.match(/^[a-zA-Z ]*$/)) {
        vaild = false;
        setusername({
          ...username,
          error: "Please enter alphabet characters only.",
        });
      } else {
        setusername({
          ...username,
          error: "",
        });
      }
    }
    if (Email.email === "") {
      setemail({ ...Email, error: "please enter email" });
      vaild = false;
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(Email.email)) {
        vaild = false;
        setemail({ ...Email, error: "*Please enter valid email-ID." });
      } else {
        setemail({ ...Email, error: "" });
      }
    }
    if (RegNo.RegNo === "") {
      setemail({ ...RegNo, error: "please enter RegNo" });
      vaild = false;
    } else {
      pattern = new RegExp(/\d{2}[A-Za-z]{1,3}\d{1,3}/i);
      console.log(pattern.test(RegNo.RegNo), RegNo.RegNo);
      if (!pattern.test(RegNo.RegNo)) {
        vaild = false;
        setRegNo({ ...RegNo, error: "*Please enter valid RegNo" });
        console.log(RegNo);
      } else {
        setRegNo({ ...RegNo, error: "" });
      }
    }
    if (password.password === "") {
      setpassword({ ...password, error: "please enter password" });
      vaild = false;
    } else {
      if (
        !password.password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        console.log(password.password);
        vaild = false;
        setpassword({
          ...password,
          error: "*Please enter secure and strong password.",
        });
      } else {
        setpassword({
          ...password,
          error: "",
        });
      }
    }
    return vaild;
  }
  function handlechange(e) {
    if (e.target.name === "email") {
      setemail({ ...Email, email: e.target.value });
    } else if (e.target.name === "password") {
      setpassword({ ...password, password: e.target.value });
    } else if (e.target.name === "username") {
      setusername({ ...username, username: e.target.value });
    } else if (e.target.name === "RegNo") {
      setRegNo({ ...RegNo, RegNo: e.target.value });
    }
  }
  function handlesignin(e) {
    e.preventDefault();
    if (validatefrom()) {
      let user = auth
        .createUserWithEmailAndPassword(Email.email, password.password)
        .then((user) => {
          setmessage({
            state: true,
            message: "sig-in successfull",
            type: "success",
          });
          database
            .ref("/details/" + user.user.uid)
            .set({
              imageurl:
                "https://support.grasshopper.com/assets/images/care/topnav/default-user-avatar.jpg",
              updated: false,
              firstName: username.username,
              RegNo: RegNo.RegNo,
              isstaff: false,
              lastname: "",
              fathername: "",
              mothername: "",
              MobileNumber: "",
              alternativeNumber: "",
            })
            .then((e) => console.log(e));
          console.log(user.user.uid);
        })
        .catch((e) => {
          console.log(e);
          setmessage({ state: true, message: e.message, type: "warning" });
          console.log(message);
        });
      setemail({ email: "", error: "" });
      setpassword({ password: "", error: "" });
      setusername({ username: "", error: "" });
      setRegNo({ RegNo: "", error: "" });
    }
  }
  return (
    <Box height="100%" className="authpage">
      <Container maxWidth="xs" className="popscreen">
        <Typography variant="h4" className="heading">
          Register
        </Typography>
        <Divider />
        <form className="component">
          <Grid
            container
            spacing={3}
            alignContent="flex-start"
            direction="column"
          >
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={username.error !== ""}
                    fullWidth
                    className="components"
                    variant="filled"
                    name="username"
                    value={username.username}
                    label="username"
                    size="small"
                    placeholder="example"
                    onChange={handlechange}
                    helperText={username.error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={RegNo.error !== ""}
                    fullWidth
                    className="components"
                    variant="filled"
                    name="RegNo"
                    value={RegNo.RegNo}
                    label="RegNo"
                    size="small"
                    placeholder="example"
                    onChange={handlechange}
                    helperText={RegNo.error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={Email.error !== ""}
                    className="components"
                    variant="filled"
                    label="Email"
                    size="small"
                    name="email"
                    value={Email.email}
                    helperText={Email.error}
                    placeholder="example@gmail.com"
                    onChange={handlechange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={password.error !== ""}
                    fullWidth
                    className="components"
                    variant="filled"
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    value={password.password}
                    helperText={password.error}
                    placeholder="password"
                    onChange={handlechange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid
                  container
                  item
                  xs={6}
                  justify="flex-start"
                  className="signbutton"
                >
                  <Button
                    className="butto component"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handlesignin}
                  >
                    sign-in
                  </Button>
                </Grid>
                <Grid container item xs={6} justify="flex-end">
                  <Link
                    onClick={() => {
                      dispatch(setlog("LOGIN"));
                    }}
                  >
                    login?
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={message.state}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={message.type}>
            {message.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};
function Loginpage() {
  const login = useSelector((state) => state.logged);
  if (login.state === "LOGIN") {
    return <Logincomp />;
  } else {
    return <Signincomp />;
  }
}

export default Loginpage;
