import { React, useContext, useEffect } from "react";
import "./UserProfile.css";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import SkillBoard from "../skill_components/SkillBoard";

const UserProfile = (props) => {
  const loggedUser = useContext(UserContext)
  const selectedUser = props.selectedUser
  const loggedUserTrades = props.loggedUserTrades
  //functions
  const getSpecificUserSkills = props.getSpecificUserSkills
  const storeRecipSkillCallbackFunc = props.storeRecipSkillCallbackFunc
  const kickOut = props.kickOutCallbackFunc(loggedUser)

  console.log('in userprofile', loggedUser)
  const selectedUserSkills = getSpecificUserSkills(selectedUser.id)

  useEffect(()=>kickOut, [])

  return (
    <div>
      <ul>
        {/* <li>ID: {id}</li> */}
        <li>{selectedUser.user_name}</li>
        {/* <li>First Name: {selectedUser.first_name}</li>
        <li>Last Name: {selectedUser.last_name}</li> */}
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
