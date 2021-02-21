import React, { useEffect, useState } from "react";
import "./library.css";
import moment from "moment";
import { auth, database } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { openlog } from "../../actions";
import SearchIcon from "@material-ui/icons/Search";
import { Row, Col, Button, Accordion } from "react-bootstrap";
function Card_data(props) {
  var { books, search, type } = props;
  const userinfo = useSelector((state) => state.userinfo);
  var arr = books;
  arr = arr.filter((i) => {
    return i[type].toString().toLowerCase().includes(search);
  });
  function getbook(isbn, numberofbooks, title) {
    auth.onAuthStateChanged((user) => {
      let alreadyexist;
      if (userinfo.feild.recivebooks === undefined) {
        alreadyexist = false;
      } else if (Object.keys(userinfo.feild.recivebooks).includes(isbn)) {
        alreadyexist = true;
      } else {
        alreadyexist = false;
      }
      if (!alreadyexist) {
        let db;
        db = database.ref(`details/${userinfo.uid}/recivebooks/${isbn}`);
        db.set({
          isbn: isbn,
          booktitle: title,
          reciveddate: moment().format("DD MMM YYYY"),
          submitiondata: moment().add(7, "days").format("DD MMM YYYY"),
          status: "Not-submited",
        });
        db = database.ref(
          `bookdata/pickedbooks/${userinfo.feild.RegNo}${isbn}`
        );
        db.set({
          isbn: isbn,
          booktitle: title,
          reciveddate: moment().format("DD MMM YYYY"),
          submitiondata: moment().add(7, "days").format("DD MMM YYYY"),
          studentuid: userinfo.uid,
          studentname: userinfo.feild.firstName + " " + userinfo.feild.lastname,
          RegNo: userinfo.feild.RegNo,
        });
        db = database.ref(`bookdata/books/${isbn}`);
        db.once("value").then((e) => {
          db.set({ ...e.val(), totalbooks: numberofbooks - 1 });
        });
      }
    });
  }
  var datas = arr.map((i) => {
    return (
      <div className="books-data" key={i.isbn}>
        <Accordion.Toggle as={"div"} variant="link" eventKey={i.isbn}>
          <img src={i.thumbnailUrl} alt="no image" className="thumbnailimg" />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={i.isbn} className="detail-discription">
          <Row>
            <Col xs={12} sm={4} className="detail-discription-image">
              <h3 className="Title">{i.title}</h3>
              <img
                src={i.thumbnailUrl}
                alt="no image"
                className="thumbnailimg"
              />
            </Col>
            <Col xs={12} sm={8}>
              <h3 className="Title">{i.authors.toString()}</h3>
              <div className="detail-content">
                <p>{i.shortDescription}</p>
              </div>
              <div>
                <p> pageCount : {i.pageCount}</p>
                <p> TotalBooks : {i.totalbooks}</p>
                <Button
                  disabled={!i.totalbooks}
                  onClick={() => {
                    getbook(i.isbn, i.totalbooks, i.title);
                  }}
                >
                  getBook
                </Button>
              </div>
            </Col>
          </Row>
        </Accordion.Collapse>
      </div>
    );
  });
  return datas;
}
function Library() {
  const status = useSelector((i) => i.logged);
  const dispatch = useDispatch();
  console.log("testing", status);
  if (!status.islogged) {
    dispatch(openlog());
  }
  const [books, setbooks] = useState([]);
  const [search, setsearch] = useState("");
  const [type, settype] = useState("authors");
  useEffect(() => {
    let db = database.ref("bookdata/books");
    db.on("value", (snap) => {
      setbooks(Object.values(snap.val()));
    });
  }, []);
  return (
    <div className="library">
      <div className="search-bar">
        <h1 className="heading"> Search Books </h1>
        <div className="search-group">
          <input
            className="search-input"
            placeholder="enter"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          <select
            name="cars"
            id="type"
            value={type}
            onChange={(e) => {
              settype(e.target.value);
              console.log(type);
            }}
          >
            <option value="title">title</option>
            <option value="isbn">isbn</option>
            <option value="authors">authors</option>
          </select>
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
        <div className="search-results">
          <Accordion>
            <div className="book-container">
              <Card_data books={books} search={search} type={type} />
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Library;
