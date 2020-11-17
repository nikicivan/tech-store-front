import React, { useEffect, useState } from "react";
import "./sideDrawer.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { purple } from "@material-ui/core/colors";
import { setDrawer } from "../../redux/drawer/drawer.actions";

import CART from "../../redux/cart/cart.types";
import COUPON from "../../redux/coupons/coupons.types";
import { cashOnDelivery } from "../../redux/cart/cart.actions";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const SideDrawer = () => {
  const classes = useStyles();
  const history = useHistory();

  const drawer = useSelector((state) => state.drawer);
  const { trigger } = drawer;

  const [state, setState] = useState({
    right: trigger,
  });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    setState({
      right: trigger,
    });
  }, [trigger]);

  const handleClickToCart = () => {
    history.push("/cart");
    dispatch({ type: CART.CART_SAVE_RESET });
    dispatch({ type: CART.CART_EMPTY_RESET });
    dispatch({ type: CART.CART_GET_RESET });
    dispatch({ type: CART.CART_ADDRESS_RESET });
    dispatch({ type: COUPON.COUPON_APPLY_TO_CART_RESET });
    dispatch(cashOnDelivery(false));
    dispatch(setDrawer(false));
  };

  const toggleDrawer = (anchor, open) =>
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          {/* <p className="drawerTitle2">{cartItems.length} proizvoda</p> */}
          <ListItemText>{cartItems.length} item(s) in basket.</ListItemText>
        </ListItem>
      </List>
      {cartItems.map((cartItem) => (
        <List key={cartItem.product}>
          <ListItem style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={cartItem.images[0].url}
              alt={cartItem.title}
              className="drawerImage"
            />
            <p className="drawerTitle">{cartItem.title}</p>
          </ListItem>
        </List>
      ))}

      <Divider />
      <ListItem>
        <ColorButton
          variant="contained"
          color="primary"
          style={{ outlineWidth: "0" }}
          className={classes.margin}
          onClick={handleClickToCart}
        >
          Dodaj u korpu
        </ColorButton>
      </ListItem>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
          >
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => {
              toggleDrawer(anchor, false);
              dispatch(setDrawer(false));
            }}
            visible={drawer}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideDrawer;
