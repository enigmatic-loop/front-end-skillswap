import { useState, useEffect } from "react";
import "./UserSignUpForm.css";

const UserSignUpForm = (props) => {
	const googleUser = props.googleUser
	const addUserCallbackFunc = props.addUserCallbackFunc
	const responseMsg = props.responseMsg
	const kickOut = props.kickOutCallbackFunc(googleUser)

	// we would like to populate firstName, and lastName in INITIAL_FORM_DATA with googleUser.given_name and googleUser.family_name
	// requires check for required fields

	useEffect(()=>kickOut, [])

	const INITIAL_FORM_DATA = {
		email: googleUser.email,
		user_name: "",
		first_name: googleUser.given_name,
		last_name: googleUser.family_name,
		city: ""
	}

	const [newUserFormFields, setNewUserFormFields] = useState(INITIAL_FORM_DATA);

	const onUserNameChange = (e) => {
		setNewUserFormFields({
			...newUserFormFields,
			user_name: e.target.value,
		});
	};

	const onFirstNameChange = (e) => {
		setNewUserFormFields({
			...newUserFormFields,
			first_name: e.target.value,
		});
	};

	const onLastNameChange = (e) => {
		setNewUserFormFields({
			...newUserFormFields,
			last_name: e.target.value,
		});
	};

	const onCityChange = (e) => {
		setNewUserFormFields({
			...newUserFormFields,
			city: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(newUserFormFields) //delete me
		addUserCallbackFunc(newUserFormFields)
	};

	return (
		<form onSubmit={onSubmit}>
				<legend>Sign Up</legend>
				<div>
					<p><b>email: </b> {googleUser.email}</p>
				</div>
				<div>
						<p><b>username: </b>
						<input name="username" 
							value={newUserFormFields.user_name} 
							placeholder="enter a username..." 
							onChange={onUserNameChange} />*</p>
				</div>
				<div>
						<p><b>first name: </b>
						<input name="first name" 
							value={newUserFormFields.first_name} 
							placeholder="enter your first name..."
							onChange={onFirstNameChange}  />*</p>
				</div>
				<div>
						<p><b>last name: </b>
						<input name="last name" 
							value={newUserFormFields.last_name} 
							placeholder="enter your last name..."
							onChange={onLastNameChange} />*</p>
				</div>
				<div>
						<p><b>city: </b>
						<input name="city" 
							value={newUserFormFields.city} 
							placeholder="enter your city..."
							onChange={onCityChange} /></p>
				</div>
				<div>
						<input type="submit" value="Sign Up" />
				</div>
				<h3>{responseMsg}</h3>
		</form>
	)
}

export default UserSignUpForm;