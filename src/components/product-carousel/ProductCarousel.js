import React from "react";
import "./productCarousel.css";

import { Carousel } from "react-bootstrap";

import imgCarousel1 from "../../images/carousel/01.jpg";
import imgCarousel2 from "../../images/carousel/02.jpg";
import imgCarousel3 from "../../images/carousel/03.jpg";
import imgCarousel4 from "../../images/carousel/04.jpg";
import imgCarousel5 from "../../images/carousel/05.jpg";
import imgCarousel6 from "../../images/carousel/06.jpg";
import imgCarousel7 from "../../images/carousel/07.jpg";

const ProductCarousel = () => {
  return (
    <div className="carousel">
      <Carousel pause="hover" className="bg-dark">
        <Carousel.Item>
          <img
            src={imgCarousel1}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imgCarousel2}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imgCarousel3}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imgCarousel4}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imgCarousel5}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imgCarousel6}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={imgCarousel7}
            alt="carousel_image"
            className="d-block w-100"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
