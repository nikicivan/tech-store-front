import React, { useEffect, useState } from "react";
import "../../pages/home/home.css";

import { toast } from "react-toastify";
import img1 from "../../images/01.jpg";
import img2 from "../../images/02.jpg";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsCount,
} from "../../redux/product/product.actions";
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

  const productsFetch = useSelector((state) => state.productsFetch);
  const { products, loading, error } = productsFetch;

  const productsFetchCount = useSelector((state) => state.productsFetchCount);
  const { count } = productsFetchCount;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts("createdAt", "desc", page));
    dispatch(fetchProductsCount());
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="home">
      {loading ? <Spinner /> : error ? toast.error(error) : (<>
        <div className="home__title">
          <h1>Novi proizvodi</h1>
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
          <img src={img1} alt="image__banner" className="home__latestImage2" />
          <img src={img2} alt="image__banner" className="home__latestImage2" />
        </div>
      </>)}
    </div>
  );
};

export default NewArrivals;
