import React, { useEffect, useState } from "react";
import "../../pages/home/home.css";

import { toast } from "react-toastify";
import img3 from "../../images/03.jpg";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySold } from "../../redux/product/product.actions";
import ProductCard from "../product-card/ProductCard";
import Spinner from "../spinner/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const NewArrivals = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const productsFetchBySold = useSelector((state) => state.productsFetchBySold);
  const { products, loading, error } = productsFetchBySold;

  const productsFetchCount = useSelector((state) => state.productsFetchCount);
  const { count } = productsFetchCount;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsBySold("sold", "desc", page));
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  //   const fetchSubmit = () => {
  //     dispatch(fetchProductsBySold("sold", "desc", page));
  //   };

  return (
    <div className="home">
      {loading ? <Spinner /> : error ? toast.error(error) : (<>
        <div className="home__title">
          <h1>Najprodavaniji proizvodi</h1>
        </div>
        <div className="home__container">
          {products?.map((product) => (
            <div key={product._id} className="home__productCard">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className={classes.root}>
          <Pagination
            count={Math.ceil(count / 4)}
            page={page}
            onChange={handleChange}
            style={{
              justifyContent: "center !important",
              margin: "1rem 0",
              outlineWidth: "0",
            }}
          />
        </div>
        <div className="home__latestImage">
          <img src={img3} alt="image__banner" className="home__latestImage1" />
        </div>
      </>)}
    </div>
  );
};

export default NewArrivals;
