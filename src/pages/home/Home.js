import React, { useEffect } from "react";
import "./home.css";

import NewArrivals from "../../components/home-components/NewArivals";
import BestSellers from "../../components/home-components/BestSellers";
import ProductCarousel from "../../components/product-carousel/ProductCarousel";
import CategoryList from "../../components/category-list/CategoryList";
import SubCategoryList from "../../components/sub-category-list/SubCategoryList";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <ProductCarousel />
      <NewArrivals />
      <BestSellers />
      <CategoryList />
      <SubCategoryList />
    </div>
  );
};

export default Home;
