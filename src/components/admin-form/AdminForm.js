import React from "react";
import "./adminForm.css";

import Button from "@material-ui/core/Button";

const AdminForm = ({ categoryName, setCategoryName, handleSubmit }) => {
  return (
    <div className="adminForm">
      <form className="adminForm__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          autoFocus
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

export default AdminForm;
