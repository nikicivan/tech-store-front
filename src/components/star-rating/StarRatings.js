import React from "react";
import "./starRatings.css";

import StarRating from "react-star-ratings";

const StarRatings = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="1rem"
        starSpacing="5px"
        starHoverColor="red"
        starEmptyColor="purple"
      />
      <br />
    </>
  );
};

export default StarRatings;
