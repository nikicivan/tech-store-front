import React, { useEffect, useState } from "react";
import "./shopPage.css";

import { useDispatch, useSelector } from "react-redux";

import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { getProductsByCount } from "../../redux/product/product.actions";

import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import ProductCard from "../../components/product-card/ProductCard";
import {
  fetchProductsByFilter,
  searchText,
} from "../../redux/filters/filters.actions";
import PriceSlider from "../../components/price-slider/PriceSlider";
import CheckBoxCategories from "../../components/check-box-categories/CheckBoxCategories";
import { getCategories } from "../../redux/category/category.actions";
import StarRatings from "../../components/star-rating/StarRatings";
import { getSubs } from "../../redux/sub/sub.actions";
import SubCategoryFilter from "../../components/sub-category-filter/SubCategoryFilter";
import RadioButtonFilter from "../../components/radio-button-filter/RadioButtonFilter";

const ShopPage = () => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [star, setStar] = useState("");
  const shipping = ["Yes", "No"];
  const brands = [
    "Apple",
    "Lenovo",
    "HP",
    "Samsung",
    "Microsoft",
    "Beko",
    "Gorenje",
  ];
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const productsGetByCount = useSelector((state) => state.productsGetByCount);
  const { products, loading, error } = productsGetByCount;

  const filtersSearch = useSelector((state) => state.filtersSearch);
  const {
    products: productsFilter,
    loading: loadingFilter,
    error: errorFilter,
  } = filtersSearch;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories: categoriesList } = categoryList;

  const subList = useSelector((state) => state.subList);
  const { subs } = subList;

  const filtersText = useSelector((state) => state.filtersText);
  const { text } = filtersText;

  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProductsByCount(20));
    }
  }, [dispatch, products, text]);

  useEffect(() => {
    if (text !== "") {
      const delayed = setTimeout(() => {
        dispatch(fetchProductsByFilter({ query: text }));
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [dispatch, text]);

  useEffect(() => {
    dispatch(fetchProductsByFilter({ price }));
  }, [dispatch, price, ok]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubs());
  }, [dispatch, categories]);

  const toggle = () => {
    setOpen(!open);
  };

  const handleChangePrice = (event, newValue) => {
    dispatch(searchText(""));
    setPrice(newValue);
    setTimeout(() => {
      setOk(!ok);
    }, 500);
  };

  const handleCheckCategory = (e) => {
    setPrice([0, 0]);
    // console.log("click", e.target.value);
    let inTheState = [...categories];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    // if not found returns -1 else return index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategories(inTheState);
    dispatch(fetchProductsByFilter({ category: inTheState }));
  };

  const handleStarClick = (num) => {
    // console.log(num);
    setStar(num);
    dispatch(fetchProductsByFilter({ stars: num }));
  };

  const showStars = () => (
    <div className="star__ratings">
      <div className="star__ratingsTitle">
        <StarBorderIcon />
        <p>Ocene</p>
      </div>
      <StarRatings starClick={handleStarClick} numberOfStars={5} />
      <StarRatings starClick={handleStarClick} numberOfStars={4} />
      <StarRatings starClick={handleStarClick} numberOfStars={3} />
      <StarRatings starClick={handleStarClick} numberOfStars={2} />
      <StarRatings starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleClickSubCategory = (id) => {
    dispatch(fetchProductsByFilter({ sub: id }));
    window.scrollTo(0, 0);
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    dispatch(fetchProductsByFilter({ color: e.target.value }));
    window.scrollTo(0, 0);
  };

  const handleChangeShipping = (e) => {
    e.preventDefault();
    dispatch(fetchProductsByFilter({ shipping: e.target.value }));
    window.scrollTo(0, 0);
  };

  const handleChangeBrand = (e) => {
    e.preventDefault();
    dispatch(fetchProductsByFilter({ brand: e.target.value }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="shopPage">
      <div className="shopPage__filters">
        <div className="shopPage__filtersButton">
          <IconButton style={{ outlineWidth: "0" }} onClick={toggle}>
            <MenuRoundedIcon style={{ color: "#000" }} fontSize="large" />
          </IconButton>
          <p>Searching / Filters</p>
        </div>
        {open && (
          <div className="shopPage__filtersOption">
            <PriceSlider
              price={price}
              handleChangePrice={handleChangePrice}
            />
            <CheckBoxCategories
              handleCheckCategory={handleCheckCategory}
              categoriesList={categoriesList}
              categories={categories}
            />
            {showStars()}
            <SubCategoryFilter
              subs={subs}
              handleClickSubCategory={handleClickSubCategory}
            />
            <RadioButtonFilter
              items={colors}
              title="boji"
              handleChangeColor={handleChangeColor}
            />
            <RadioButtonFilter
              items={shipping}
              title="dostavi"
              handleChangeShipping={handleChangeShipping}
            />
            <RadioButtonFilter
              items={brands}
              title="brendu"
              handleChangeBrand={handleChangeBrand}
            />
          </div>
        )}
      </div>
      {productsFilter?.length === 0
        ? <div className="shopPage__results">
          {/* <h1>There is no data...</h1> */}
          {loading
            ? <Spinner />
            : error
            ? toast.error(error)
            : products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
        : <div className="shopPage__results">
          {loadingFilter ? <Spinner />
          : errorFilter ? toast.error(errorFilter)
          : productsFilter?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>}
    </div>
  );
};

export default ShopPage;
