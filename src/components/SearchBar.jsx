import { React, useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./SearchBar.css";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = ({ placeholder, userNames, fetchOneUserByUserName, timeoutNav, allSkills }) => {
  const [searchToggle, setSearchToggle] = useState("")
  
  // Search by User
  // const [filterUsers, setFilterUsers] = useState([]);
  // const [userEntered, setUserEntered] = useState("");

  // // Search by Skill
  // const [filterSkills, setFilterSkills] = useState([]);
  // const [skillEntered, setSkillEntered] = useState("");

  const [filterResults, setFilterResults] = useState([]);
  const [resultEntered, setResultEntered] = useState("");

  const skillNames = allSkills.map((skill)=>{return skill.name})

  const searchBy = searchToggle === "skill" ? skillNames : userNames;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    const click = e.target.innerText
    if (click === 'Username') {
      setSearchToggle("username")
    } else {
      setSearchToggle("skill")
    }
    setAnchorEl(null);
  };

  // const handleSearch = (e) => {
  //   const searchValue = e.target.value;
  //   setUserEntered(searchValue);
  //   const newSearch = userNames.filter((value) => {
  //     // console.log(value);
  //     return value.toLowerCase().includes(searchValue.toLowerCase());
  //   });

  //   if (searchValue === "") {
  //     setFilterUsers([]);
  //   } else {
  //     setFilterUsers(newSearch);
  //   }
  // };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setResultEntered(searchValue);
    const newSearch = searchBy.filter((value) => {
      // console.log(value);
      return value.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (searchValue === "") {
      setFilterResults([]);
    } else {
      setFilterResults(newSearch);
    }
  };

  const clearInput = () => {
    setFilterResults([]);
    // useRef hook?
    setResultEntered("");
  };

  return (
    <div className="search">
      {/* <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Search By
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Skills</MenuItem>
          <MenuItem onClick={handleClose}>Username</MenuItem>
        </Menu>
      </div> */}
      
      {/* <!-- Dropdown Trigger -->
      <button className='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</button>

      {/* <!-- Dropdown Structure --> */}
      {/* <ul id='dropdown1' class='dropdown-content'>
        <li><a href="#!">Skill</a></li>
        <li><a href="#!">Username</a></li>
        <li class="divider" tabindex="-1"></li>
        <li><a href="#!">three</a></li>
        <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
        <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
      </ul> */}
      <div className="row">
        <div className="col s2 pull-s0">
          <div className="top-padding-3">
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Search By
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Skills</MenuItem>
              <MenuItem onClick={handleClose}>Username</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="col s1 push-s9">
          <div className="top-padding-2">
            <div className="searchIcon">
              {resultEntered.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
        </div>
        <div className="col s9 pull-s1">
            <div className="searchInput">
              <input
                type="text"
                placeholder={placeholder}
                onChange={handleSearch}
                value={resultEntered}
              />
            </div>
        </div>
      </div>
      {filterResults.length > 0 && (
        <div className="results">
          {filterResults.slice(0, 10).map((value, key) => {
            if (searchToggle === 'skill') {
            let value = ""
            for (const skill of allSkills) {
              if (value === skill.name) {
                value = skill.user_name
              }
            }
            }
            return (
              <div
                key={key}
                onClick={() => {
                  fetchOneUserByUserName(value);
                  timeoutNav("/userprofile", 500)
                }}>
                {" "}{value}{" "}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
