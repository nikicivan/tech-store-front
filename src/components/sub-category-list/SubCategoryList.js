import React, { useEffect } from "react";
import "./subCategoryList.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getSubs } from "../../redux/sub/sub.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const SubCategoryList = () => {
  const classes = useStyles();

  const subList = useSelector((state) => state.subList);
  const { subs, loading, error } = subList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubs());
  }, [dispatch]);

  return (
    <div className="subCategoryList">
      <div className="categoryList__title">
        <h1>Sub-Categories</h1>
      </div>
      <div className="categoryList__container">
        {loading
          ? <Spinner />
          : error
          ? toast.error(error)
          : subs?.map((sub) => (
            <div key={sub._id} className={classes.root}>
              <Link to={`/sub-category/${sub.slug}`}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ width: "20%", outlineWidth: "0" }}
                  className="categoryList__list"
                >
                  {sub.name}
                </Button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubCategoryList;
