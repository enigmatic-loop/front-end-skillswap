import { React, useState } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = ({ placeholder, data }) => {
  const [filterUsers, setFilterUsers] = useState([]);
  const [userEntered, setUserEntered] = useState("");

  const handleUserSearch = (e) => {
    const searchValue = e.target.value;
    setUserEntered(searchValue);
    const newSearch = data.filter((value) => {
      return value.user_name.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (searchValue === "") {
      setFilterUsers([]);
    } else {
      setFilterUsers(newSearch);
    }
  };

  const clearInput = () => {
    setFilterUsers([]);
    // useRef hook?
    setUserEntered("");
  };
  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleUserSearch}
          value={userEntered}
        />
        <div className="searchIcon">
          {userEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filterUsers.length > 0 && (
        <div className="results">
          {filterUsers.slice(0, 10).map((value, key) => {
            return <div> {value.user_name} </div>;
            // <a className="user_item" href="value.user_profile_link" target="_blank"> {value.user_name} </a>;
          })}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
