import { React, useState } from "react";
import "./UserProfile.css";
import PropTypes from "prop-types";

const UserProfile = (props) => {
  const id = props.id;
  const userName = props.user_name;
  const firstName = props.first_name;
  const lastName = props.last_name;
  const city = props.city;
  const profileDescription = props.profile_description;

  return (
    <div>
      <ul>
        <li>ID: {id}</li>
        <li>User Name: {userName}</li>
        <li>First Name: {firstName}</li>
        <li>Last Name: {lastName}</li>
        <li>City: {city}</li>
        <li>
          Profile Description: {profileDescription} {console.log(props)}
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
