import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./couponsPage.css";

import { toast } from "react-toastify";
import dateFormat from "dateformat";

import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Spinner from "../../../components/spinner/Spinner";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { purple } from "@material-ui/core/colors";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../redux/coupons/coupons.actions";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#9c27b0",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CouponsPage = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [expired, setExpired] = useState(new Date());
  const [discount, setDiscount] = useState("");

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const couponCreate = useSelector((state) => state.couponCreate);
  const { success: successCreate, error: errorCreate } = couponCreate;

  const couponDelete = useSelector((state) => state.couponDelete);
  const { success: successDelete, error: errorDelete } = couponDelete;

  const couponsList = useSelector((state) => state.couponsList);
  const { coupons, loading, error } = couponsList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons(userInfo?.email?.token?.token));
  }, [dispatch, successCreate, successDelete, userInfo]);

  useEffect(() => {
    if (successCreate) {
      toast.success("Coupon created");
    } else {
      toast.error(errorCreate);
    }
  }, [successCreate, errorCreate]);

  useEffect(() => {
    if (successDelete) {
      toast.success("Coupon removed");
    } else {
      toast.error(errorDelete);
    }
  }, [successDelete, errorDelete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCoupon({ name, expired, discount }, userInfo?.email?.token?.token),
    );
    setName("");
    setDiscount("");
    setExpired(Date.now());
  };

  const handleRemove = (id) => {
    dispatch(removeCoupon(id, userInfo?.email?.token?.token));
  };

  return (
    <div className="couponsPage">
      <div className="couponsPage__container">
        <div className="couponsPage__nav">
          <AdminNav />
        </div>
        <div className="couponsPage__containerForm">
          <div className="couponsPage__content">
            <form className="couponsPage__form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter coupon name"
                autoFocus
              />
              <DatePicker
                selected={expired}
                onChange={(date) => setExpired(date)}
              />
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Set discount %"
                style={{ marginTop: "1rem" }}
              />
              <ColorButton
                variant="contained"
                color="primary"
                style={{ outlineWidth: "0" }}
                className={classes.margin}
                type="submit"
              >
                Save
              </ColorButton>
            </form>
          </div>
          {loading ? <Spinner /> : error ? toast.error(error) : (
            <div className="couponsPage__table">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>NAME</StyledTableCell>
                      <StyledTableCell align="center">EXPIRED</StyledTableCell>
                      <StyledTableCell align="center">DISCOUNT</StyledTableCell>
                      <StyledTableCell align="center">ACTIONS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {coupons.map((coupon) => (
                    <TableBody key={coupon._id}>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {coupon.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dateFormat(coupon.expired)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {coupon.discount}%
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            style={{ outlineWidth: "0" }}
                            onClick={() => handleRemove(coupon._id)}
                            title="delete"
                          >
                            <DeleteIcon
                              style={{ color: "#9c27b0" }}
                            />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsPage;
