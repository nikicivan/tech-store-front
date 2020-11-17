import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./categoryCreate.css";

import { Link } from "react-router-dom";

import Spinner from "../../../components/spinner/Spinner";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../../redux/category/category.actions";
import CATEGORY from "../../../redux/category/category.types";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { toast } from "react-toastify";
import AdminForm from "../../../components/admin-form/AdminForm";

const CategoryCreate = () => {
  const [categoryName, setCategoryName] = useState("");
  const [keyword, setKeyword] = useState("");

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { category, loading, error, success } = categoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(`Sub category is created`);
      dispatch({ type: CATEGORY.CATEGORY_CREATE_RESET });
    } else {
      dispatch(getCategories());
    }
  }, [dispatch, userInfo, success, successDelete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCategory({ name: categoryName }, userInfo.email.token.token),
    );
    setCategoryName("");
    toast.success(`Category ${categoryName} successfully created.`);
  };

  const handleRemove = (slug) => {
    if (window.confirm("Are you sure that you want to delete?")) {
      dispatch(deleteCategory(slug, userInfo.email.token.token));
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="categoryCreate">
      <div className="categoryCreate__container">
        <div className="categoryCreate__nav">
          <AdminNav />
        </div>
        <div className="categoryCreate__containerForm">
          <div className="categoryCreate__content">
            {loading
              ? <Spinner />
              : error
              ? <p>{error}</p>
              : success
              ? <p>Category {category.name} successfully created</p>
              : (
                <div className="categoryCreate__title">
                  <h1>Create category</h1>
                </div>
              )}
            <AdminForm
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="categoryCreate__filter">
            <input
              type="search"
              placeholder="filter"
              value={keyword}
              onChange={handleSearchChange}
              className="search__input"
            />
            <SearchIcon style={{ color: "white" }} fontSize="large" />
          </div>

          <div className="categoryCreate__list">
            {categories.filter(searched(keyword)).map((category) => (
              <div
                className="categoryCreate__singleCategory"
                key={category._id}
              >
                <p>{category.name}</p>
                <div className="createCategory__icons">
                  <IconButton style={{ color: "white" }}>
                    <Link to={`/admin/category/${category.slug}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemove(category.slug)}
                    style={{ color: "white" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
