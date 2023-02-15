import { React } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {

	return (
		<nav className="nav-wrapper">
			<div className="padding-left">
				<Link to="home" className="brand-logo left">SkillSwap</Link>
			</div>
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