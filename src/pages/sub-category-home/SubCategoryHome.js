import React, { useEffect } from "react";
import "./subCategoryHome.css";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import { getSubBySlug } from "../../redux/sub/sub.actions";
import ProductCard from "../../components/product-card/ProductCard";

const SubCategoryHome = ({ match }) => {
  const slug = match.params.slug;

  const subBySlug = useSelector((state) => state.subBySlug);
  const { sub, products, loading } = subBySlug;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubBySlug(slug));
  }, [dispatch, slug]);

  return (
    <div className="subCategoryHome">
      {loading ? <Spinner /> : products?.length > 0
        ? (<>
          <div className="categoryHome__title">
            {products.length === 1
              ? <h1>{products.length} proizvod u pod kategoriji {sub.name}</h1>
              : <h1>
                {products.length} proizvoda u pod kategoriji {sub.name}
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
            <h1>Nema proizvoda povezanih sa {sub?.name}</h1>
          </div>
        )}
    </div>
  );
};

export default SubCategoryHome;
