import React from "react";
import "./searchFilters.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import { searchText } from "../../redux/filters/filters.actions";

const SearchFilters = () => {
  const history = useHistory();

  const filtersText = useSelector((state) => state.filtersText);
  const { text } = filtersText;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(searchText(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit} className="header__search">
      <input
        className="searchFilters__searchInput"
        type="text"
        onChange={handleChange}
        value={text}
      />
      <SearchIcon
        className="searchFilters__searchIcon"
        style={{ color: "white", marginLeft: "0.5rem" }}
        fontSize="large"
      />
    </form>
  );
};

export default SearchFilters;
