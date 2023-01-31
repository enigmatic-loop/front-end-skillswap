import { React, useState } from "react";
import "./UserSignUpForm.css";

const UserSignUpForm = (props) => {
	const googleUser = props.googleUser

	return (
		<form>
			<formset>
				<legend>Sign Up</legend>
				<div>
					<p><b>email: </b> {googleUser.email}</p>
				</div>
				<div>
						<p><b>username: </b><input name="user name" value="" placeholder="enter a username..." />*</p>
				</div>
				<div>
						<p><b>first name: </b><input name="first name" value={googleUser.given_name} placeholder="enter your first name..." />*</p>
				</div>
				<div>
						<p><b>last name: </b><input name="last name" value={googleUser.family_name} placeholder="enter your last name..." />*</p>
				</div>
				<div>
						<p><b>city: </b><input name="city" value="" placeholder="enter your city..." /></p>
				</div>
				<div>
						<input type="submit" value="Sign Up" />
				</div>
			</formset>
		</form>
	)
}

export default UserSignUpForm;