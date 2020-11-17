import React, { useEffect, useState } from "react";

import AdminNav from "../../../components/admin-nav/AdminNav";
import "./productUpdate.css";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";

import ImageUpload from "../../../components/admin-image-upload/ImageUpload";
import {
  getProductBySlug,
  updateProduct,
} from "../../../redux/product/product.actions";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MultiSelect from "../../../components/admin-multi-select/MultiSelect";
import {
  getCategories,
  getSubsCategories,
} from "../../../redux/category/category.actions";
import CATEGORY from "../../../redux/category/category.types";
import PRODUCT from "../../../redux/product/product.types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProductUpdate = ({ match, history }) => {
  const slug = match.params.slug;
  const classes = useStyles();

  const productGetBySlug = useSelector((state) => state.productGetBySlug);
  const { product, loading, success: successGetBySlug } = productGetBySlug;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate, error: errorUpdate } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categorySubs = useSelector((state) => state.categorySubs);
  const { categories: categoriesSubs } = categorySubs;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subs, setSubs] = useState([]);
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);

  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const brands = [
    "Apple",
    "Lenovo",
    "HP",
    "Samsung",
    "Microsoft",
    "Beko",
    "Gorenje",
  ];

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (successUpdate) {
        dispatch({ type: PRODUCT.PRODUCT_UPDATE_RESET });
        history.push("/admin/products");
        toast.success(`Product ${product.title} updated.`);
      } else {
        toast.error(errorUpdate);
        if (!successGetBySlug) {
          dispatch(getProductBySlug(slug));
          dispatch(getCategories());
        } else {
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
          setSubs([]);
          setShipping(product.shipping);
          setQuantity(product.quantity);
          setImages(product.images);
          setColor(product.color);
          setBrand(product.brand);
          setCategory(product.category._id);
        }
      }
    },
    [
      dispatch,
      history,
      product,
      successUpdate,
      successGetBySlug,
      slug,
      errorUpdate,
    ],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(slug, {
      title,
      description,
      price,
      subs,
      shipping,
      quantity,
      images,
      color,
      brand,
      category,
    }, userInfo?.email?.token?.token));
  };

  const handleSubCategoryChange = (e) => {
    e.preventDefault();
    setSubs([]);
    dispatch({ type: CATEGORY.CATEGORY_SUBS_RESET });
    setCategory(e.target.value);
    dispatch(getSubsCategories(e.target.value));
  };

  return (
    <div className="productUpdate">
      <div className="productCreate__container">
        <div className="productCreate__nav">
          <AdminNav />
        </div>
        <div className="categoryCreate__containerForm">
          <div className="categoryCreate__content">
            {loading ? <Spinner /> : (<>
              <div className="categoryCreate__title">
                <h1>Update Product</h1>
              </div>
              <div>
                {loadingImage ? <Spinner /> : (<>
                  <ImageUpload
                    images={images}
                    setImages={setImages}
                    setLoadingImage={setLoadingImage}
                  />
                  <form
                    className="productCreate__form"
                    onSubmit={handleSubmit}
                  >
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Update category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={category}
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
                      subs={subs}
                      setSubs={setSubs}
                    />}
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Update shipping
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={shipping}
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
                        Update color
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={color}
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
                        Update brand
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={brand}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter product title"
                      name="title"
                    />
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      placeholder="Enter product description"
                    />
                    <input
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter product price"
                    />
                    <input
                      type="number"
                      value={quantity}
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
                </>)}
              </div>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
