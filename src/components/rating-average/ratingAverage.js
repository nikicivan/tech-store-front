import React from "react";
import StarRating from "react-star-ratings";

export const ratingAverage = (p) => {
  if (p?.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("totalReduced", totalReduced);

    let highest = length * 5;
    // console.log(highest);

    let result = (totalReduced * 5) / highest;
    // console.log("result", result);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StarRating
          starDimension="2rem"
          starSpacing="5px"
          starRatedColor="purple"
          rating={result}
        />
        <p
          style={{
            marginLeft: "1rem",
            fontSize: "smaller",
            color: "#575757",
            fontWeight: "bold",
            userSelect: "none",
          }}
        >
          ({length})
        </p>
      </div>
    );
  }
};
