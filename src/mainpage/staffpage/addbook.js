import React, { useState } from "react";
import "./addbook.css";
import { auth, database, storage } from "../../firebase";
import { Form, Row, Col, Image, Button } from "react-bootstrap";
function Addbook(props) {
  const { indexs } = props;
  const [details, setDetails] = useState({
    title: "",
    isbn: "",
    authors: "",
    pageCount: 0,
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrX1yjZ97Q9TaD-d5JTI8mjo3_caDHE5ZpGA&usqp=CAU",
    shortDescription: "",
    totalbooks: 0,
  });
  const [error, seterror] = useState({
    title: "",
    isbn: "",
    authors: "",
    pageCount: "",
    thumbnailUrl: "",
    shortDescription: "",
    totalbooks: "",
  });
  function valideateform() {
    let feilds = details;
    let errors = {
      title: "",
      isbn: "",
      pageCount: "",
      thumbnailUrl: "",
      shortDescription: "",
      totalbooks: "",
    };
    let fromisvalid = true;
    if (!feilds["title"]) {
      fromisvalid = false;
      errors["title"] = "*Please enter your title";
    }
    if (!feilds["authors"]) {
      fromisvalid = false;
      errors["authors"] = "*Please enter your authors";
    }
    if (!feilds["isbn"]) {
      fromisvalid = false;
      errors["isbn"] = "*Please enter your isbn";
    }
    if (typeof feilds["isbn"] !== "undefined") {
      console.log(indexs.includes(feilds["isbn"]));
      if (indexs.includes(feilds["isbn"])) {
        fromisvalid = false;
        errors["isbn"] = "The isbn is already exist";
      }
    }
    if (!feilds["pageCount"]) {
      fromisvalid = false;
      errors["pageCount"] = "*Please enter your pageCount";
    }
    if (!feilds["thumbnailUrl"]) {
      fromisvalid = false;
      errors["thumbnailUrl"] = "*Please enter your thumbnailUrl";
    }
    if (!feilds["shortDescription"]) {
      fromisvalid = false;
      errors["shortDescription"] = "*Please enter your shortDescription";
    }
    if (!feilds["totalbooks"]) {
      fromisvalid = false;
      errors["totalbooks"] = "*Please enter your totalbooks";
    }
    seterror(errors);
    return fromisvalid;
  }
  function adddata(e) {
    e.preventDefault();
    if (valideateform()) {
      console.log(details);
      let db = database.ref(`bookdata/books/${details.isbn}`);
      db.set(details)
        .then((e) => {
          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function handleChange(e) {
    let feild = details;
    console.log(e.target.value);
    feild[e.target.name] = e.target.value;
    setDetails(feild);
    console.log(details);
  }
  return (
    <div className="add-book-container">
      <Form>
        <Row>
          <Col xs={12} sm={6}>
            <Row xs={12} className="image-comp">
              <Image src={details.thumbnailUrl} className="profileimage" />
            </Row>
            <Row xs={12}>
              <Form.File className="file-input">
                <Form.File.Label>thumbnailUrl</Form.File.Label>
                <Form.Control
                  type="text"
                  name="thumbnailUrl"
                  className="input-img"
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">
                  {error.thumbnailUrl}
                </Form.Text>
              </Form.File>
            </Row>
            <Row className="row-comp">
              <Col>
                <Form.Group className="authors-comp">
                  <Form.Label>*Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">{error.title}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={6}>
            <Row className="row-comp">
              <Col>
                <Form.Group className="authors-comp">
                  <Form.Label>*authors</Form.Label>
                  <Form.Control
                    type="text"
                    name="authors"
                    placeholder="authors"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">{error.authors}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-comp">
              <Col>
                <Form.Group className="authors-comp">
                  <Form.Label>*isbn</Form.Label>
                  <Form.Control
                    type="text"
                    name="isbn"
                    placeholder="isbn"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">{error.isbn}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-comp">
              <Col>
                <Form.Group className="authors-comp">
                  <Form.Label>*pageCount</Form.Label>
                  <Form.Control
                    type="number"
                    name="pageCount"
                    placeholder="pageCount"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    {error.pageCount}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-comp">
              <Col>
                <Form.Group className="authors-comp">
                  <Form.Label>*totalbooks</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalbooks"
                    placeholder="totalbooks"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    {error.totalbooks}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row-comp">
          <Col>
            <Form.Group className="authors-comp">
              <Form.Label>shortDescription</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="shortDescription"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Text className="text-danger">
              {error.shortDescription}
            </Form.Text>
          </Col>
        </Row>
        <Row className="row-comp">
          <Col className="submit">
            <Button type="submit" onClick={adddata}>
              Submit form
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Addbook;
