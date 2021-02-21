import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { database } from "../../firebase";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import "./viewstudent.css";
import moment from "moment";

function submit(userinfo) {
  let db = database.ref(
    `details/${userinfo.studentuid}/recivebooks/${userinfo.isbn}`
  );
  db.remove();
  db = database.ref(`bookdata/pickedbooks/${userinfo.RegNo}${userinfo.isbn}`);
  db.remove();
}
const studenlist = (studenlist) => {
  console.log(typeof studenlist);
  if (studenlist !== undefined) {
    return Object.values(studenlist).map((i) => {
      let fine = 0;
      if (0 > moment(i.submitiondata).diff(moment(), "days")) {
        fine = -moment(i.submitiondata).diff(moment(), "days") * 10;
      }
      console.log(i);
      return (
        <tr key={i.isbn}>
          <td>{i.RegNo}</td>
          <td>{i.studentname}</td>
          <td>{i.isbn}</td>
          <td>{i.booktitle}</td>
          <td>{i.reciveddate}</td>
          <td>{i.submitiondata}</td>
          <td>{fine}.Rs</td>
          <td>
            <button className="returnbutton" onClick={() => submit(i)}>
              <KeyboardReturnIcon />
            </button>
          </td>
        </tr>
      );
    });
  }
};
function Viewstudent() {
  const [studentlist, setstudentlist] = useState([]);
  useEffect(() => {
    let db = database.ref("bookdata/pickedbooks");
    db.on("value", (snap) => {
      if (snap.val() !== null) {
        setstudentlist(Object.values(snap.val()));
      }
    });
  }, []);
  return (
    <div>
      <h3>My Book</h3>
      <Table striped bordered hover size="sm" className="listconstent">
        <thead>
          <tr>
            <th>RegNo</th>
            <th>studentname</th>
            <th>isbn</th>
            <th>booktitle</th>
            <th>reciveddate</th>
            <th>submitiondata</th>
            <th>fine</th>
            <th>return</th>
          </tr>
        </thead>
        <tbody>{studenlist(studentlist)}</tbody>
      </Table>
    </div>
  );
}

export default Viewstudent;
