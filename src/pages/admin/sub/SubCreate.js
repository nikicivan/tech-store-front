import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./subCreate.css";

import { Link } from "react-router-dom";

import Spinner from "../../../components/spinner/Spinner";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { toast } from "react-toastify";
import AdminForm from "../../../components/admin-form/AdminForm";
import { createSub, deleteSub, getSubs } from "../../../redux/sub/sub.actions";
import SUB from "../../../redux/sub/sub.types";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getCategories } from "../../../redux/category/category.actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SubCreate = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCreate = useSelector((state) => state.subCreate);
  const { sub, loading, error, success } = subCreate;

  const subList = useSelector((state) => state.subList);
  const { subs } = subList;

  const subDelete = useSelector((state) => state.subDelete);
  const { success: successDelete } = subDelete;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(`Sub category ${name} is created`);
      dispatch({ type: SUB.SUB_CREATE_RESET });
    } else {
      dispatch(getCategories());
      dispatch(getSubs());
    }
  }, [dispatch, userInfo, success, successDelete, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSub({ name, parent: category }, userInfo.email.token.token),
    );
    setName("");
  };

  const handleRemove = (slug) => {
    if (window.confirm("Are you sure that you want to delete?")) {
      dispatch(deleteSub(slug, userInfo.email.token.token));
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const classes = useStyles();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="subCreate">
      <div className="subCreate__container">
        <div className="subCreate__nav">
          <AdminNav />
        </div>
        <div className="subCreate__containerForm">
          <div className="subCreate__content">
            {loading
              ? <Spinner />
              : error
              ? <p>{error}</p>
              : success
              ? <p>Sub category {sub.name} successfully created</p>
              : (<>
                <div className="subCreate__title">
                  <h1>Create sub category</h1>
                </div>
                <div>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Select category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={category}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </>)}
            <AdminForm
              categoryName={name}
              setCategoryName={setName}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="subCreate__filter">
            <input
              type="search"
              placeholder="filter"
              value={keyword}
              onChange={handleSearchChange}
              className="search__input"
            />
            <SearchIcon style={{ color: "white" }} fontSize="large" />
          </div>

          <div className="subCreate__list">
            {subs?.filter(searched(keyword))?.map((sub) => (
              <div
                className="subCreate__singleCategory"
                key={sub._id}
              >
                <p>{sub.name}<span>{sub.parent.name}</span></p>
                <div className="subCreate__icons">
                  <IconButton style={{ color: "white" }}>
                    <Link to={`/admin/sub/${sub.slug}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemove(sub.slug)}
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

export default SubCreate;
