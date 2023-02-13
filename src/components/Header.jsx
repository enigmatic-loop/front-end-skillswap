import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./Header.css";

const Header = (props) => {
	// const loggedUser = useContext(UserContext)
	// const googleUser = props.googleUser

	return (
		<div className="nav-wrapper">
			<Link to="home" className="brand-logo">Logo</Link>
			<ul id="nav-\\" className="right hide-on-med-and-down">
				{/* <li>
					<img src={googleUser.picture} alt="" className="circle"></img>
					<h3>{googleUser.name}</h3>
				</li> */}
				<li>
					<Link to="home" smooth="true">my page</Link>
				</li>
				{/* <li>
					<Link to="userprofile" smooth="true">empty user profile</Link>
				</li> */}
				<li>
					<Link to="skills" smooth="true">Skills</Link>
				</li>
				{/* <li>
					<Link to="signup" smooth="true">user sign up</Link>
				</li> */}
				<li>
					<Link to="updateprofile" smooth="true">update profile</Link>
				</li>
				{/* <li>
					<Link to="trade" smooth="true">trade page</Link>
				</li> */}
			</ul>
		</div>
	)
}

export default Header;