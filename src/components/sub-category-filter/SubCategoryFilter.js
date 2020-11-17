import React from "react";
import "./subCategoryFilter.css";

import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

const SubCategoryFilter = ({ subs, handleClickSubCategory }) => {
  return (
    <div className="subCategoryFilter">
      <div className="subCategoryFilter__title">
        <SubdirectoryArrowRightIcon />
        <p>Pod-kategorije</p>
      </div>
      <div className="subCategoryFilter__container">
        {subs?.map((sub) => (
          <div
            key={sub._id}
            className="subCategoryFilter__button"
            onClick={() => handleClickSubCategory(sub._id)}
          >
            <p>{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryFilter;
