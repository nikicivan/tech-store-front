import React from "react";
import "./checkBoxCategories.css";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CategoryIcon from "@material-ui/icons/Category";

const CheckBoxCategories = (
  { handleCheckCategory, categoriesList, categories },
) => {
  return (
    <div className="checkBoxCategory">
      <div className="checkBoxCategory__title">
        <CategoryIcon />
        <p>Odaberi kategoriju proizvoda:</p>
      </div>
      <FormGroup row style={{ borderBottom: "1px solid lightgray" }}>
        {categoriesList?.map((category) => (
          <FormControlLabel
            key={category._id}
            control={<Checkbox
              checked={categories.includes(category._id)}
              onChange={handleCheckCategory}
              name="checked"
              color="primary"
              value={category._id}
            />}
            label={category.name}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default CheckBoxCategories;
