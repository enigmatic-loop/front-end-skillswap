import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import "./UpdateProfileForm.css";

const UpdateProfileForm = (props) => {
	const loggedUser = useContext(UserContext)
	const updateUser = props.updateUserCallbackFunc
	const responseMsg = props.responseMsg
	const kickOut = props.kickOutCallbackFunc(loggedUser)

	useEffect(()=>kickOut, [])

	const INITIAL_FORM_DATA = {
		first_name: loggedUser.first_name,
		last_name: loggedUser.last_name,
		city: loggedUser.city,
		profile_desc: loggedUser.profile_desc,
		user_icon: ""
	}

	const [updateUserFormFields, setUpdateUserFormFields] = useState(INITIAL_FORM_DATA);

	const onFirstNameChange = (e) => {
		setUpdateUserFormFields({
			...updateUserFormFields,
			first_name: e.target.value,
		});
	};

	const onLastNameChange = (e) => {
		setUpdateUserFormFields({
			...updateUserFormFields,
			last_name: e.target.value,
		});
	};

	const onCityChange = (e) => {
		setUpdateUserFormFields({
			...updateUserFormFields,
			city: e.target.value,
		});
	};

	const onDescriptionChange = (e) => {
		setUpdateUserFormFields({
			...updateUserFormFields,
			profile_desc: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log('SUBMITTING THIS RIGHT HERE: ',updateUserFormFields) //delete me
		updateUser(updateUserFormFields)
	};

	return (
		<div className="container">
			<form className="col s8" onSubmit={onSubmit}>
					<legend>Update Profile</legend>
					<div>
						<p><b>email: </b> {loggedUser.email}</p>
					</div>
					<div>
						<p><b>username: </b> {loggedUser.user_name}</p>
					</div>
					<div>
							<b>first name: </b>
							<div>
							<input name="first name" 
								value={updateUserFormFields.first_name} 
								placeholder="enter your first name..."
								onChange={onFirstNameChange}  />*
							</div>
					</div>
					<div>
							<b>last name: </b>
							<div>
								<input name="last name" 
									value={updateUserFormFields.last_name} 
									placeholder="enter your last name..."
									onChange={onLastNameChange} />*
							</div>
					</div>
					<div>
							<p><b>city: </b>
							<input name="city" 
								value={updateUserFormFields.city} 
								placeholder="enter your city..."
								onChange={onCityChange} /></p>
					</div>
					<div>
							<p><b>about me: </b>
							<input name="description" 
								value={updateUserFormFields.profile_desc} 
								placeholder="describe yourself..."
								onChange={onDescriptionChange} /></p>
					</div>
					<div>
							<input type="submit" value="Update Profile" />
					</div>
					<h3>{responseMsg}</h3>
			</form>
		</div>
	)
}

export default UpdateProfileForm;