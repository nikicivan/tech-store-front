import React from "react";
import numeral from "numeral";
import dateFormat from "dateformat";

import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Invoice = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>TECH STORE</Text>
        <Text style={styles.subtitle}>Order Summary</Text>
        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(x) => x.product.title} />
            <DataTableCell
              getContent={(x) =>
                `${numeral(x.product.price).format("0,0.00")} RSD`}
            />
            <DataTableCell getContent={(x) => x.count} />
            <DataTableCell getContent={(x) => x.product.brand} />
            <DataTableCell getContent={(x) => x.color} />
          </TableBody>
        </Table>
        <Text style={styles.text}>
          <Text>Date: {dateFormat(order.createdAt)}</Text>
          {"\n"}
          {"\n"}
          <Text>Order ID: {order.paymentIntent.id}</Text>
          {"\n"}
          {"\n"}
          <Text>Order status: {order.orderStatus}</Text>
          {"\n"}
          {"\n"}
          <Text>
            Total Paid: {numeral(order.paymentIntent.amount / 100).format(
              "0,0.00",
            )} RSD
          </Text>
          {"\n"}
          {"\n"}
        </Text>
        <Text style={styles.footer}>
          ~ {order.orderedBy.name}, thank you for shopping with us! ~
        </Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;
