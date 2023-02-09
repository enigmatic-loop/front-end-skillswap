import { React } from "react";
import "./UserProfile.css";
import PropTypes from "prop-types";
import SkillBoard from "../skill_components/SkillBoard";

const UserProfile = (props) => {
  const selectedUser = props.selectedUser
  const getSpecificUserSkills = props.getSpecificUserSkills
  const storeRecipSkillCallbackFunc = props.storeRecipSkillCallbackFunc
  const loggedUserTrades = props.loggedUserTrades

  const selectedUserSkills = getSpecificUserSkills(selectedUser.id)

  return (
    <div>
      <ul>
        {/* <li>ID: {id}</li> */}
        <li>User Name: {selectedUser.user_name}</li>
        <li>First Name: {selectedUser.first_name}</li>
        <li>Last Name: {selectedUser.last_name}</li>
        <li>City: {selectedUser.city}</li>
        <li>
          Profile Description: {selectedUser.profile_desc}
        </li>
      </ul>
      <SkillBoard 
        skills={selectedUserSkills} 
        storeRecipSkillCallbackFunc={storeRecipSkillCallbackFunc} 
        loggedUserTrades={loggedUserTrades}/>
    </div>
  );
};

export default UserProfile;
