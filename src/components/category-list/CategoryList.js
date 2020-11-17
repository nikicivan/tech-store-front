import React, { useEffect } from "react";
import "./categoryList.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../redux/category/category.actions";

import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CategoryList = () => {
  const classes = useStyles();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="categoryList">
      <div className="categoryList__title">
        <h1>Categories</h1>
      </div>
      <div className="categoryList__container">
        {loading ? <Spinner /> : error ? toast.error(error) : (
          categories?.map((category) => (
            <div key={category._id} className={classes.root}>
              <Link to={`/category/${category.slug}`}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: "20%", outlineWidth: "0" }}
                  className="categoryList__list"
                >
                  {category.name}
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
