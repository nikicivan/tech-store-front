import React from "react";
import "./cartItem.css";

import { useDispatch } from "react-redux";

import numeral from "numeral";
import ModalImage from "react-modal-image";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";

import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import IconButton from "@material-ui/core/IconButton";

import { updateCart } from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const colors = ["Black", "Brown", "Silver", "White", "Blue"];

const CartItem = ({ cartItem }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleChangeColor = (e) => {
    e.preventDefault();
    let cartItems = [];
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }

    cartItems.map((product, index) => {
      if (product.product === cartItem.product) {
        cartItems[index].color = e.target.value;
      }
      return cartItems;
    });
    // console.log("cart update color", cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateCart());
  };

  const decreaseCount = (e) => {
    let cartItems = [];
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    cartItems.map((product, index) => {
      if (product.product === cartItem.product) {
        cartItems[index].count -= 1;
      }
      return cartItems;
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateCart());
  };

  const increaseCount = () => {
    let cartItems = [];
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    cartItems.map((product, index) => {
      if (product.product === cartItem.product) {
        cartItems[index].count += 1;
      }
      return cartItems;
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateCart());
  };

  const handleRemove = () => {
    let cartItems = [];
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    cartItems.map((product, index) => {
      if (product.product === cartItem.product) {
        cartItems.splice(index, 1);
      }
      return cartItems;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateCart());
  };

  return (
    <div className="cartItem">
      <div className="cartItem__info">
        <div className="cartItem__img">
          <ModalImage
            small={cartItem.images[0].url}
            large={cartItem.images[0].url}
          />
        </div>
        <div className="cartItem__infoDetails">
          <p>{cartItem.title}</p>
          <p>
            Cena: <strong>
              {numeral(cartItem.price).format("0,0.00")} RSD
            </strong>
          </p>
          <p>Brand: {cartItem.brand}</p>
          <div className="cartItem__select">
            <FormControl
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Izaberi boju
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChangeColor}
                name="color"
                value={cartItem.color}
              >
                {colors?.map((c, idx) => (
                  <MenuItem key={idx} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="cartItem__selectCount">
              <IconButton
                style={{ outlineWidth: "0", color: "purple" }}
                onClick={decreaseCount}
                disabled={cartItem.count < 2}
              >
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <p>{cartItem.count}</p>
              <IconButton
                style={{ outlineWidth: "0", color: "purple" }}
                onClick={increaseCount}
                disabled={cartItem.count >= cartItem.quantity}
              >
                <ArrowForwardIosRoundedIcon />
              </IconButton>
            </div>
          </div>
          <ColorButton
            variant="contained"
            color="primary"
            style={{ outlineWidth: "0" }}
            className={classes.margin}
            onClick={handleRemove}
          >
            Remove from cart
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
