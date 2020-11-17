import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
// import { toast } from "react-toastify";
import { getCategoryBySlug } from "../../redux/category/category.actions";

import "./categoryHome.css";
import ProductCard from "../../components/product-card/ProductCard";

const CategoryHome = ({ match }) => {
  const slug = match.params.slug;

  const categoryBySlug = useSelector((state) => state.categoryBySlug);
  const { category, products, loading } = categoryBySlug;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryBySlug(slug));
  }, [dispatch, slug]);

  return (
    <div className="categoryHome">
      {loading ? <Spinner /> : products?.length > 0
        ? (<>
          <div className="categoryHome__title">
            {products.length === 1
              ? <h1>{products.length} proizvod u kategoriji {category.name}</h1>
              : <h1>
                {products.length} proizvoda u kategoriji {category.name}
              </h1>}
          </div>
          <div className="categoryHome__container">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>)
        : (
          <div className="categoryHome__title">
            <h1>Nema proizvoda povezanih sa {category?.name}</h1>
          </div>
        )}
    </div>
  );
};

export default CategoryHome;
