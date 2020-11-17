import React from "react";
import "./order.css";

import numeral from "numeral";
import dateFormat from "dateformat";

import { PDFDownloadLink } from "@react-pdf/renderer";

import Invoice from "../invoice-pdf/Invoice";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Order = ({ orders, hidden, handleStatusChange, status }) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const showOrderInTable = (order) => (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">TITLE</StyledTableCell>
            <StyledTableCell align="center">PRICE</StyledTableCell>
            <StyledTableCell align="center">BRAND</StyledTableCell>
            <StyledTableCell align="center">COLOR</StyledTableCell>
            <StyledTableCell align="center">COUNT</StyledTableCell>
            <StyledTableCell align="center">SHIPPING</StyledTableCell>
          </TableRow>
        </TableHead>
        {order?.products?.map((p, index) => (
          <TableBody key={index}>
            <StyledTableRow>
              <StyledTableCell align="center">
                {p.product.title.substring(0, 25)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {numeral(p.product.price).format("0,0.00")} RSD
              </StyledTableCell>
              <StyledTableCell align="center">
                {p.product.brand}
              </StyledTableCell>
              <StyledTableCell align="center">
                {p.color}
              </StyledTableCell>
              <StyledTableCell align="center">
                {p.count}
              </StyledTableCell>
              <StyledTableCell align="center">
                {p.product.shipping
                  ? <CheckRoundedIcon
                    style={{ color: "green" }}
                  />
                  : p.product.shipping}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="userHistory__pdfButton"
    >
      <PictureAsPdfIcon style={{ color: "purple" }} />
      <p>Download invoice</p>
    </PDFDownloadLink>
  );

  const ShowEachOrder = (orders, hidden, status) => (
    orders?.map((order) => (
      <div className="userHistory__eachOrder" key={order?._id}>
        <div className="userHistory__orderDetails">
          <h1>Order and payment details</h1>
          <p><span>Order ID:</span>{order?.paymentIntent?.id}</p>
          <p>
            <span>Buyer:</span>
            {order?.orderedBy?.name}
            {" "}({order?.orderedBy?.email})
          </p>
          <p><span>Shipping address:</span>{order?.orderedBy?.address}</p>
          <p>
            <span>City:</span>
            {order?.orderedBy?.city}
            {" "}({order?.orderedBy?.postalCode})
          </p>
          <p><span>Country:</span>{order?.orderedBy?.country}</p>
          <p>
            <span>Total amount:</span>
            {numeral(order?.paymentIntent?.amount / 100).format("0,0.00")} RSD
          </p>
          <p>
            <span>Payment method:</span>
            {order?.paymentIntent?.payment_method_types[0]}
          </p>
          <p>
            <span>Payment:</span>
            {order?.paymentIntent?.status.toUpperCase()}
          </p>
          <p><span>Ordered on:</span>{dateFormat(order?.createdAt)}</p>
          <p style={{ color: "green", fontWeight: "700" }}>
            <span>Status:</span>
            {order?.orderStatus}
          </p>
          <div
            className={`${
              hidden ? "userHistory__select hidden" : "userHistory__select"
            }`}
          >
            <FormControl
              variant="filled"
              className={classes2.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Change status
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={order.orderStatus}
                name="status"
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <MenuItem value="Not Processed">
                  Not Processed
                </MenuItem>
                <MenuItem value="Processing">
                  Processing
                </MenuItem>
                <MenuItem value="Dispatched">
                  Dispatched
                </MenuItem>
                <MenuItem value="Cancelled">
                  Cancelled
                </MenuItem>
                <MenuItem value="Completed">
                  Completed
                </MenuItem>
                <MenuItem value="Cash On Delivery">
                  Cash On Delivery
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {showOrderInTable(order)}
        <div className="userHistory__pdf">
          {showDownloadLink(order)}
        </div>
      </div>
    ))
  );

  return (
    <div className="order">
      <div className="userHistory__table">
        {ShowEachOrder(orders, hidden, status)}
      </div>
    </div>
  );
};

export default Order;
