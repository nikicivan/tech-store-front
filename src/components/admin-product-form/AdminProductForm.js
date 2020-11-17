import React from "react";
import { useDispatch } from "react-redux";

import { getSubsCategories } from "../../redux/category/category.actions";
import CATEGORY from "../../redux/category/category.types";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MultiSelect from "../admin-multi-select/MultiSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AdminProductForm = (
  {
    handleSubmit,
    categories,
    colors,
    brands,
    categoriesSubs,
    values,
    setSubs,
    setCategory,
    setDescription,
    setPrice,
    setShipping,
    setQuantity,
    setImages,
    setColor,
    setBrand,
    setTitle,
  },
) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubCategoryChange = (e) => {
    e.preventDefault();
    setSubs([]);
    dispatch({ type: CATEGORY.CATEGORY_SUBS_RESET });
    setCategory(e.target.value);
    dispatch(getSubsCategories(e.target.value));
  };

  return (
    <div>
      <form
        className="productCreate__form"
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-filled-label">
            Select category
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={values.category}
            onChange={handleSubCategoryChange}
          >
            {categories?.map((category) => (
              <MenuItem key={category?._id} value={category?._id}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {categoriesSubs.length > 0 && <MultiSelect
          categoriesSubs={categoriesSubs}
          subs={values.subs}
          setSubs={setSubs}
        />}
        <FormControl
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-filled-label">
            Select shipping
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={values.shipping}
            name="shipping"
            onChange={(e) => setShipping(e.target.value)}
          >
            <MenuItem value="No">
              NO
            </MenuItem>
            <MenuItem value="Yes">
              Yes
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-filled-label">
            Select color
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={values.color}
            onChange={(e) => setColor(e.target.value)}
            name="color"
          >
            {colors?.map((c, idx) => (
              <MenuItem key={idx} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-filled-label">
            Select brand
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={values.brand}
            onChange={(e) => setBrand(e.target.value)}
            name="brand"
          >
            {brands?.map((b, idx) => (
              <MenuItem key={idx} value={b}>{b}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="text"
          value={values.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
          name="title"
          autoFocus
        />
        <input
          type="text"
          value={values.description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Enter product description"
        />
        <input
          type="number"
          name="price"
          value={values.price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
        />
        <input
          type="number"
          value={values.quantity}
          name="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter product quantity"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AdminProductForm;
