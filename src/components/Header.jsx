import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
    const googleUser = props.googleUser

    return (
        <ul>
            <li>
                <img src={googleUser.picture}></img>
                <h3>{googleUser.name}</h3>
            </li>
            <li>
                <Link to="home" smooth={true}>my page</Link>
            </li>
            <li>
                <Link to="userprofile" smooth={true}>empty user profile</Link>
            </li>
            <li>
                <Link to="signup" smooth={true}>user sign up</Link>
            </li>
        </ul>
    )
}

export default Header;