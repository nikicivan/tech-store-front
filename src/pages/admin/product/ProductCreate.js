import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./productCreate.css";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";

import { createProduct } from "../../../redux/product/product.actions";
import AdminProductForm from "../../../components/admin-product-form/AdminProductForm";
import { getCategories } from "../../../redux/category/category.actions";
import PRODUCT from "../../../redux/product/product.types";
import ImageUpload from "../../../components/admin-image-upload/ImageUpload";

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

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subs, setSubs] = useState([]);
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const values = {
    title,
    description,
    price,
    subs,
    shipping,
    quantity,
    color,
    brand,
    category,
    images,
  };

  const productCreate = useSelector((state) => state.productCreate);
  const {
    product,
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const categorySubs = useSelector((state) => state.categorySubs);
  const { categories: categoriesSubs } = categorySubs;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    if (successCreate) {
      toast.success(`Product ${product?.title} created`);
      dispatch({ type: PRODUCT.PRODUCT_CREATE_RESET });
    } else if (errorCreate) {
      toast.error(errorCreate);
    }
  }, [successCreate, errorCreate, product, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(values, userInfo.email.token.token));
    setCategory("");
    setTitle("");
    setDescription("");
    setPrice("");
    setShipping("");
    setQuantity("");
    setImages([]);
    setColor("");
    setBrand("");
  };

  return (
    <div className="productCreate">
      <div className="productCreate__container">
        <div className="productCreate__nav">
          <AdminNav />
        </div>
        <div className="categoryCreate__containerForm">
          <div className="categoryCreate__content">
            {loadingCreate ? <Spinner /> : (<>
              <div className="categoryCreate__title">
                <h1>Create Product</h1>
              </div>
              <div>
                {loadingImage ? <Spinner /> : (
                  <ImageUpload
                    images={images}
                    setImages={setImages}
                    setLoadingImage={setLoadingImage}
                  />
                )}
                <AdminProductForm
                  categories={categories}
                  categoriesSubs={categoriesSubs}
                  values={values}
                  setSubs={setSubs}
                  setCategory={setCategory}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setPrice={setPrice}
                  setShipping={setShipping}
                  setQuantity={setQuantity}
                  setImages={setImages}
                  setColor={setColor}
                  setBrand={setBrand}
                  handleSubmit={handleSubmit}
                  colors={colors}
                  brands={brands}
                />
              </div>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
