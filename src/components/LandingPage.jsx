import { React } from "react";
import "./LandingPage.css";

const LandingPage = () => {


	return (
		<div>
			<h3>Welcome to SkillSwap</h3>
			<h4>Please Login with Google</h4>
			{/* google login API */}
			<div id="signInDiv"></div>
		</div>
	)
}

export default LandingPage;