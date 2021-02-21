import React from "react";
import {
  Image,
  Row,
  Button,
  Col,
  Carousel,
  CarouselItem,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./portfolio.css";
export default function Porfolic() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100 carimg"
            alt="First slide"
            src="https://www.mundarelibrary.ab.ca/public/uploads/snippets/1593454196bannerimage/1606416985-1600w_595h_1593454196bannerimage.jpg"
          />
          <Carousel.Caption className="captionText">
            <h3>Jorge Luis Borges </h3>
            <p>
              I have always imagined that Paradise will be a kind of a Library."
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carimg"
            alt="second slide"
            src="https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2017/12/20170509_Eng_Library_DJA_012_3.jpg?itok=P8rKug-h"
          />
          <Carousel.Caption className="captionText">
            <h3>Walter Savage Landor </h3>
            <p>Nothing is pleasanter than exploring a library.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carimg"
            alt="third slide"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
          />
          <Carousel.Caption className="captionText">
            <h3>Jorge Luis Borges </h3>
            <p>
              I have always imagined that Paradise will be a kind of a Library."
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="user-info">
        <Row className="changeover">
          <Col xs={12} md={6} className="visual-content">
            <div className="text-content">
              <h3>so Much To See </h3>
              <h3> so Much To Do</h3>
              <p> @your library</p>
              <a href="/profile" className="change-to">
                access liberary
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} className="image-content">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxSpUCgM9c1Gxb8VZ63EpeLiw8VdMqAEkb6w&usqp=CAU"
              alt="library-image"
              className="library-image"
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
