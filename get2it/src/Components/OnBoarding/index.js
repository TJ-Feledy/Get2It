import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Row,
  Col,
  Carousel,
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import "./style.css";
import { Link } from 'react-router-dom';

const items = [
  {
    src: require('./focused.PNG'),
    altText: "",
    caption: ""
  },
  {
    src: require('./organized.PNG'),
    altText: "",
    caption: ""
  },
  {
    src:require('./fun.PNG'),
    altText: "",
    caption: ""
  }
];

const OnBoarding = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        
      >
        <img className="imgSlide" src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  

  return (
    <div className='onBoardingContainer'>
      <Container className="container">
        <Row>
          <Col xs={2}>
            {/* <i  id="arrow" className="fas fa-arrow-left"></i> */}
          </Col>
          <Col xs={8} className="signUp">
            Welcome!
          </Col>
        </Row>
      </Container>
      <div className="fullContainer">
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
            className="indecator"
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
      <Link className="nextBTN" to={"/"}>
        Let's Get2It!
      </Link>
    </div>
  );
};

export default OnBoarding;
