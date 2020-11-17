import React, { useEffect, useState } from "react";
import AdminForm from "../../../components/admin-form/AdminForm";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./subUpdate.css";

import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import SUB from "../../../redux/sub/sub.types";
import { getSubBySlug, updateSub } from "../../../redux/sub/sub.actions";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SubUpdate = ({ match, history }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const slug = match.params.slug;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const subBySlug = useSelector((state) => state.subBySlug);
  const { sub, loading, error } = subBySlug;

  const subUpdate = useSelector((state) => state.subUpdate);
  const { success: successUpdate } = subUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUB.SUB_UPDATE_RESET });
      history.push("/admin/sub");
    } else {
      dispatch(getSubBySlug(slug));
      setName(sub.name);
      setCategory(sub.parent);
    }
  }, [dispatch, slug, sub._id, sub.name, sub.parent, history, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSub(slug, { name, parent: category }, userInfo.email.token.token),
    );
    toast.success(`Category ${sub.name} updated.`);
  };

  const classes = useStyles();

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };

  return (
    <div className="subUpdate">
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
              : (<>
                <div className="categoryUpdate__title">
                  <h1>Update category</h1>
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
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
