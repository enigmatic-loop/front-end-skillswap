import { React } from "react";
import SkillBoard from "../skill_components/SkillBoard";
import "./UserDashboard.css";

const UserDashboard = ({ loggedUser, getLoggedInUserSkills, addSkillCallbackFunc }) => {
  const userSkills = getLoggedInUserSkills(loggedUser.id)
  return (
    <div>
      <h3>home</h3>
      <ul>
        <li>User Name: {loggedUser.user_name}</li>
        <li>First Name: {loggedUser.first_name}</li>
        <li>Last Name: {loggedUser.last_name}</li>
        <li>City: {loggedUser.city}</li>
        <li>
          Profile Description: {loggedUser.profile_desc}
        </li>
        <SkillBoard
              skills={userSkills}
              addSkillCallbackFunc={addSkillCallbackFunc}
              loggedUser={loggedUser}
            />
      </ul>
    </div>
  )
}

export default UserDashboard;