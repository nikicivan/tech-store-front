import React, { useEffect } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./productsList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductsByCount,
} from "../../../redux/product/product.actions";
import PRODUCT from "../../../redux/product/product.types";

import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";
import ProductCard from "../../../components/product-card/ProductCard";

import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";

const ProductsList = ({ history }) => {
  const productsGetByCount = useSelector((state) => state.productsGetByCount);
  const { products, loading, error } = productsGetByCount;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete, error: errorDelete } = productDelete;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByCount(20));
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (successDelete) {
      toast.success(`Product deleted`);
      dispatch({ type: PRODUCT.PRODUCT_DELETE_RESET });
    } else {
      toast.error(errorDelete);
    }
  }, [errorDelete, successDelete, dispatch]);

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(slug, userInfo?.email?.token?.token));
    }
  };

  const handleEdit = (slug) => {
    history.push(`/admin/product/${slug}/edit`);
    dispatch({ type: PRODUCT.PRODUCT_GET_BY_SLUG_RESET });
  };

  return (
    <div className="productsList">
      <div className="productsList__container">
        <div className="productsList__nav">
          <AdminNav />
        </div>
        <div className="productsList__content">
          {loading ? <Spinner /> : error ? toast.error(error) : (
            products.map((product) => (
              <div className="productList__card" key={product._id}>
                <ProductCard product={product} />
                <div className="productList__options">
                  <IconButton
                    title="Edit"
                    onClick={() => handleEdit(product.slug)}
                    style={{ outlineWidth: "0" }}
                  >
                    <EditRoundedIcon
                      fontSize="large"
                      style={{ color: "blue" }}
                    />
                  </IconButton>
                  <IconButton
                    title="Delete"
                    onClick={() => handleDelete(product.slug)}
                    style={{ outlineWidth: "0" }}
                  >
                    <DeleteOutlineRoundedIcon
                      fontSize="large"
                      style={{ color: "#d9534f" }}
                    />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
