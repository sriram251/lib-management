import React, { useEffect, useState } from "react";
import "./staffpage.css";
import AddIcon from "@material-ui/icons/Add";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import PeopleIcon from "@material-ui/icons/People";
import { Row, Col, Dropdown, Accordion } from "react-bootstrap";
import { database } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { openlog } from "../../actions";
import Addbooks from "./addbook";
import Viewstudent from "./viewstudent";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
function Card_data(props) {
  var { books, search, type } = props;
  var arr = books;
  arr = arr.filter((i) => {
    return i[type].toString().toLowerCase().includes(search);
  });
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
              </div>
            </Col>
          </Row>
        </Accordion.Collapse>
      </div>
    );
  });
  return datas;
}
function Staffpage() {
  const status = useSelector((i) => i.logged);
  const dispatch = useDispatch();
  console.log("testing", status);
  if (!status.islogged) {
    dispatch(openlog());
  }
  const [books, setbooks] = useState([]);
  const [search, setsearch] = useState("");
  const [type, settype] = useState("authors");
  const [index, setindex] = useState([]);
  useEffect(() => {
    if (status.islogged) {
      let db = database.ref("bookdata/books");
      db.on("value", (snap) => {
        console.log(Object.values(snap.val()));
        setindex(Object.keys(snap.val()));
        setbooks(Object.values(snap.val()));
      });
    }
  }, []);
  let { path, url } = useRouteMatch();
  return (
    <div className="staffpage">
      <Row>
        <Col sm={3} xs={12} className="staff-menu">
          <h3 id="MENU-title">Menu</h3>
          <Dropdown.Divider />
          <ul className="menu-list">
            <li>
              <PeopleIcon />
              <Link to={`${url}`}>View Book</Link>
            </li>
            <li>
              <AddIcon />
              <Link to={`${url}/AddBook`}>Add Book</Link>
            </li>
            <li>
              <ViewCarouselIcon />
              <Link to={`${url}/viewstudents`}>view students</Link>
            </li>
          </ul>
          <div className="search-type">
            <p>filter by</p>
            <input
              placeholder="search"
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
          </div>
        </Col>
        <Col sm={9} xs={12} className="start-result">
          <Switch>
            <Route exact path={path}>
              <Accordion>
                <div className="book-container">
                  <Card_data books={books} search={search} type={type} />
                </div>
              </Accordion>
            </Route>
            <Route path={`${path}/viewstudents`}>
              <Viewstudent />
            </Route>
            <Route path={`${path}/AddBook`}>
              <Addbooks indexs={index} />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default Staffpage;
