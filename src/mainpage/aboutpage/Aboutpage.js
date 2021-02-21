import React, { useState, useEffect } from "react";
import "./about.css";
import { auth, database, storage } from "../../firebase";
import {
  Image,
  Row,
  Col,
  Container,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login, openlog } from "../../actions";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckIcon from "@material-ui/icons/Check";

function Aboutpage() {
  const [message, setmessage] = useState({});
  const status = useSelector((i) => i.logged);
  const dispatch = useDispatch();

  console.log("testing", status);
  if (!status.islogged) {
    dispatch(openlog());
  }
  const tempurl =
    "https://support.grasshopper.com/assets/images/care/topnav/default-user-avatar.jpg";
  const [state, setstate] = useState({
    uid: "",
    feild: {
      imageurl: tempurl,
      updated: false,
      firstName: "",
      lastname: "",
      fathername: "",
      mothername: "",
      MobileNumber: "",
      recivebooks: {},
      alternativeNumber: "",
    },
    progress: 0,
  });
  const [error, seterror] = useState({
    firstName: "",
    lastname: "",
    fathername: "",
    mothername: "",
    MobileNumber: "",
    alternativeNumber: "",
    imageurl: "",
  });
  function validateForm() {
    let feilds = state.feild;
    let errors = {
      firstName: "",
      lastname: "",
      fathername: "",
      mothername: "",
      MobileNumber: "",
      alternativeNumber: "",
      imageurl: "",
    };
    console.log(feilds);
    let fromisvalid = true;
    if (!feilds["firstName"]) {
      fromisvalid = false;
      errors["firstName"] = "*Please enter your firstName";
    }
    if (typeof feilds["firstName"] !== "undefined") {
      if (!feilds["firstName"].match(/^[a-zA-Z ]*$/)) {
        fromisvalid = false;
        errors["firstName"] = "Please enter alphabet characters only.";
      }
    }
    if (!feilds["lastname"]) {
      fromisvalid = false;
      errors["lastname"] = "*Please enter your lastname";
    }
    if (typeof feilds["lastname"] !== "undefined") {
      if (!feilds["lastname"].match(/^[a-zA-Z ]*$/)) {
        fromisvalid = false;
        errors["lastname"] = "Please enter alphabet characters only.";
      }
    }
    if (typeof feilds["firstName"] !== "undefined") {
      if (!feilds["firstName"].match(/^[a-zA-Z ]*$/)) {
        fromisvalid = false;
        errors["firstName"] = "Please enter alphabet characters only.";
      }
    }
    if (!feilds["mothername"]) {
      fromisvalid = false;
      errors["mothername"] = "*Please enter your mothername";
    }
    if (typeof feilds["mothername"] !== "undefined") {
      if (!feilds["mothername"].match(/^[a-zA-Z ]*$/)) {
        fromisvalid = false;
        errors["mothername"] = "Please enter alphabet characters only.";
      }
    }
    if (!feilds["fathername"]) {
      fromisvalid = false;
      errors["fathername"] = "*Please enter your fathername";
    }
    if (typeof feilds["fathername"] !== "undefined") {
      if (!feilds["fathername"].match(/^[a-zA-Z ]*$/)) {
        fromisvalid = false;
        errors["fathername"] = "Please enter alphabet characters only.";
      }
    }
    if (!feilds["MobileNumber"]) {
      fromisvalid = false;
      errors["MobileNumber"] = "*Please enter your MobileNumber";
    }
    if (typeof feilds["MobileNumber"] !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(feilds["MobileNumber"])) {
        fromisvalid = false;
        errors["MobileNumber"] = "Please enter only number.";
      } else if (feilds["MobileNumber"].length !== 10) {
        fromisvalid = false;
        errors["MobileNumber"] = "Please enter valid phone number";
      }
    }
    if (feilds["imageurl"] === tempurl) {
      fromisvalid = false;
      errors["imageurl"] = "*Please upload correct image file";
    }
    seterror(errors);
    return fromisvalid;
  }
  function Tabledata() {
    console.log("data", Object.values(message));
    let arr = Object.values(message);
    let data = arr.map((i) => {
      return (
        <tr key={i.isbn}>
          <td>{i.isbn}</td>
          <td>{i.booktitle}</td>
          <td>{i.reciveddate}</td>
        </tr>
      );
    });
    return data;
  }
  function SubmitForm(e) {
    let db = database.ref("details/" + state.uid);
    console.log(error);
    if (validateForm()) {
      console.log("is is from ok");
      let feild = state.feild;
      feild.updated = true;
      setstate({ ...state, feild: feild });
      db.set(state.feild)
        .then((e) => {
          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function handleChange(e) {
    let feild = state.feild;
    let errors = state.error;
    let imageurl = "";
    if (
      e.target.name === "profileimage" &&
      !(e.target.files[0] === undefined)
    ) {
      if (e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        console.log("file reads");
        const uploadpic = storage
          .ref(`users/${state.uid}/profile.jpg`)
          .put(e.target.files[0]);
        uploadpic.on(
          "state_changed",
          (snap) => {
            console.log("this is span  :", snap);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref(`users/${state.uid}/profile.jpg`)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                feild["imageurl"] = url;

                setstate({ ...state, feild: feild });
              });
          }
        );
      } else {
        imageurl = "Invalid image content.";
        seterror({ errors });
      }
    } else {
      feild[e.target.name] = e.target.value;
      setstate({ ...state, feild: feild });
    }
    seterror({ ...error, imageurl: imageurl });
    console.log(state);
  }

  useEffect(() => {
    var user = auth.currentUser;

    console.log(user);
    if (user !== null) {
      user.providerData.forEach((data) => {
        console.log(data);

        auth.onAuthStateChanged((user) => {
          let db = database.ref("details/" + user.uid);
          db.once("value").then((snap) => {
            if (snap.val() !== null) {
              console.log("out", snap.val());
              setstate({ ...state, feild: snap.val(), uid: user.uid });
              if ("recivebooks" in snap.val()) {
                setmessage(snap.val().recivebooks);
              }
            }
          });
          seterror({});
        });
      });
    }
  }, []);
  return (
    <div className="about-page">
      <div className="user-window">
        <h1 className="caption-text">Profile</h1>
        <br />
        <Container>
          <Form>
            <Row class>
              <Col xs={12} md={5} className="image-palce">
                <Row xs={12}>
                  <Image
                    src={state.feild.imageurl}
                    roundedCircle
                    className="profileimage"
                  />
                </Row>
                <Row xs={12}>
                  <Form.File className="file-input">
                    <Form.File.Label>profile-image</Form.File.Label>
                    <Form.File.Input
                      type="file"
                      name="profileimage"
                      onChange={handleChange}
                      disabled={state.feild.updated}
                      className="input-img"
                    />
                    <Form.Text className="text-danger">
                      {error.imageurl}
                    </Form.Text>
                  </Form.File>
                </Row>
              </Col>
              <Col xs={12} md={6} className="userDetail">
                <Row>
                  <Col xs={6} md={6}>
                    <Form.Group>
                      <Form.Label>*First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="firstName"
                        value={state.feild.firstName}
                        onChange={handleChange}
                        disabled={state.feild.updated}
                      />
                      <Form.Text className="text-danger">
                        {error.firstName}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>*last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="lastname"
                        value={state.feild.lastname}
                        onChange={handleChange}
                        disabled={state.feild.updated}
                      />
                      <Form.Text className="text-danger">
                        {error.lastname}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>*father Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fathername"
                        placeholder="father name"
                        value={state.feild.fathername}
                        onChange={handleChange}
                        disabled={state.feild.updated}
                      />
                      <Form.Text className="text-danger">
                        {error.fathername}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>*mother Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="mothername"
                        placeholder="mothername"
                        value={state.feild.mothername}
                        onChange={handleChange}
                        disabled={state.feild.updated}
                      />
                      <Form.Text className="text-danger">
                        {error.mothername}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>*mobile number</Form.Label>
                      <Form.Control
                        type="text"
                        name="MobileNumber"
                        placeholder="Mobile Number"
                        value={state.feild.MobileNumber}
                        onChange={handleChange}
                        disabled={state.feild.updated}
                      />
                      <Form.Text className="text-danger">
                        {error.MobileNumber}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>alternative number</Form.Label>
                      <Form.Control
                        type="text"
                        name="alternativeNumber"
                        placeholder="alternative Number"
                        value={state.feild.alternativeNumber}
                        onChange={handleChange}
                        disabled={state.feild.updated}
                      />
                      <Form.Text className="text-danger">
                        {error.alternativeNumber}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {!state.feild.updated ? (
                    <Button
                      variant="primary"
                      className="submit-button"
                      onClick={SubmitForm}
                    >
                      update
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      className="submit-button"
                      onClick={() => {
                        let feilds = state.feild;
                        feilds["updated"] = false;
                        setstate({ ...state, feild: feilds });
                      }}
                    >
                      <CheckIcon /> edit
                    </Button>
                  )}
                </Row>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col className="datalist">
              <p>books list</p>
              <Table>
                <thead>
                  <tr>
                    <th>isbn</th>
                    <th>booktitle</th>
                    <th>reciveddate</th>
                  </tr>
                </thead>
                <tbody>
                  <Tabledata />
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Aboutpage;
