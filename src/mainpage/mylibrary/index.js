import React from "react";
import "./mylibrary.css";
import { Image, Table, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const booklist = (userinfo) => {
  console.log(typeof userinfo.feild.recivebooks);
  if (userinfo.feild.recivebooks !== undefined) {
    return Object.values(userinfo.feild.recivebooks).map((i) => {
      var type;
      if (0 > moment(i.reciveddate).diff(moment(), "days")) {
        type = "danger";
      } else {
        type = "warning";
      }
      console.log(
        0 > moment(i.reciveddate).diff(moment(), "days"),
        moment().format("DD-MM-YYYY")
      );
      return (
        <tr key={i.isbn}>
          <td>{i.isbn}</td>
          <td>{i.booktitle}</td>
          <td>{i.reciveddate}</td>
          <td>{i.submitiondata}</td>
          <td>
            <Badge variant={type}>{i.status}</Badge>
          </td>
        </tr>
      );
    });
  }
};
function Mylibrary() {
  const userinfo = useSelector((state) => state.userinfo);
  var data = 0;
  if (userinfo.feild.recivebooks !== undefined) {
    Object.values(userinfo.feild.recivebooks).forEach((i) => {
      if (0 > moment(i.reciveddate).diff(moment(), "days")) {
        data = data - moment(i.reciveddate).diff(moment(), "days") * 10;
      }
    });
    console.log(data);
  }
  return (
    <div className="MyBook">
      <div className="userinfo-comp">
        <Image
          src={userinfo.feild.imageurl}
          alt=""
          roundedCircle
          className="profilepic"
        />
        <div>
          <h3 className="name">{userinfo.feild.firstName.toUpperCase()}</h3>
          <h3 className="name">{userinfo.feild.RegNo.toUpperCase()}</h3>
        </div>
        <h3 className="fineammout">fine : {data}.Rs</h3>
      </div>
      <div className="tabledata">
        <h3>My Book</h3>
        <Table striped bordered hover size="sm" className="listconstent">
          <thead>
            <tr>
              <th>isbn</th>
              <th>booktitle</th>
              <th>reciveddate</th>
              <th>submitiondata</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>{booklist(userinfo)}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default Mylibrary;
