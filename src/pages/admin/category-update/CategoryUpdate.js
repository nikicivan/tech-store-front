import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./categoryUpdate.css";

import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryBySlug,
  updateCategory,
} from "../../../redux/category/category.actions";
import CATEGORY from "../../../redux/category/category.types";
import AdminForm from "../../../components/admin-form/AdminForm";

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const slug = match.params.slug;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const categoryBySlug = useSelector((state) => state.categoryBySlug);
  const { category, loading, error } = categoryBySlug;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: successUpdate } = categoryUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY.CATEGORY_UPDATE_RESET });
      history.push("/admin/category");
    } else {
      dispatch(getCategoryBySlug(slug));
      setName(category.name);
    }
  }, [dispatch, slug, category.name, history, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(slug, { name }, userInfo.email.token.token));
    toast.success(`Category ${category.name} updated.`);
  };

  return (
    <div className="categoryUpdate">
      <div className="categoryUpdate__container">
        <div className="categoryUpdate__nav">
          <AdminNav />
        </div>
        <div className="categoryUpdate__content">
          <div className="categoryUpdate__contentContainer">
            {loading
              ? <Spinner />
              : error
              ? <p>{error}</p>
              : successUpdate
              ? <p>Category successfully created</p>
              : (
                <div className="categoryUpdate__title">
                  <h1>Update category</h1>
                </div>
              )}
            <AdminForm
              categoryName={name}
              setCategoryName={setName}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
