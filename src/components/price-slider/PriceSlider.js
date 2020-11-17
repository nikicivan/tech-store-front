import React from "react";
import "./priceSlider.css";
import numeral from "numeral";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function valuetext(price) {
  return `${price}RSD`;
}

const PriceSlider = ({ price, handleChangePrice }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        id="range-slider"
        gutterBottom
        style={{ display: "flex", alignItems: "center" }}
      >
        <MonetizationOnIcon />
        Izaberi raspon cene:
      </Typography>
      <Slider
        value={price}
        onChange={handleChangePrice}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={300000}
      />
      <p className="priceSlider__range">
        {numeral(price[0]).format("0,0.00")}rsd - {numeral(price[1]).format(
          "0,0.00",
        )}rsd
      </p>
    </div>
  );
};

export default PriceSlider;
