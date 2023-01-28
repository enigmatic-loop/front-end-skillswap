import { React, useState } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";

const SearchBar = (props) => {
  return <div></div>;
};

SearchBar.propTypes = {
  searchByUserName: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default SearchBar;
