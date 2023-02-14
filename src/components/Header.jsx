import { React } from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../App";
import "./Header.css";

const Header = (props) => {
	// const loggedUser = useContext(UserContext)
  const handleSignOut = props.handleSignOut
	// const googleUser = props.googleUser

	return (
		<nav className="nav-wrapper">
			<Link to="home" className="brand-logo left">SkillSwap</Link>
			<ul id="nav-\\" className="right hide-on-med-and-down">
				<li>
					<Link to="home" smooth="true">my page</Link>
				</li>
				<li>
					<Link to="skills" smooth="true">skills</Link>
				</li>
				<li>
					<Link to="updateprofile" smooth="true">update profile</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Header;