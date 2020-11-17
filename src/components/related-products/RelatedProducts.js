import React from "react";
import "./relatedProducts.css";

import img4 from "../../images/04.jpg";
import img5 from "../../images/05.jpg";
import img6 from "../../images/06.jpg";
import ProductCard from "../product-card/ProductCard";

const RelatedProducts = ({ products, loadingRelated, errorRelated }) => {
  return (
    <div className="relatedProducts">
      <div className="home__latestImage">
        <img src={img4} alt="image__banner" className="home__latestImage3" />
        <img src={img5} alt="image__banner" className="home__latestImage3" />
        <img src={img6} alt="image__banner" className="home__latestImage3" />
      </div>
      {products?.length
        ? (<>
          <div className="relatedProducts__title">
            <h1>Slicni proizvodi</h1>
          </div>
          <div className="relatedProducts__container">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>)
        : (
          <div className="relatedProducts__title">
            <h1>Ne postoje povezani proizvodi...</h1>
          </div>
        )}
    </div>
  );
};

export default RelatedProducts;
