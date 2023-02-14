import { React } from "react";
import "./LandingPage.scss";

const LandingPage = () => {


	return (
		<div className="container">
			<div className="col s8">
				<h3 className="v-big-title-center">Welcome to SkillSwap</h3>
				<h4 className="big-title-center">Please Login with Google</h4>
				{/* google login API */}
				<div id="signInDiv" className="center-margin"></div>
			</div>
		</div>
	)
}

export default LandingPage;