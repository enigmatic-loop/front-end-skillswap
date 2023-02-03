import { React, useContext } from "react";
import { UserContext } from "../../App";
import SkillBoard from "../skill_components/SkillBoard";
import NewSkillForm from "../skill_components/NewSkillForm";
import "./UserDashboard.css";

const UserDashboard = ({ getLoggedInUserSkills, addSkillCallbackFunc, deleteSkillCallbackFunc }) => {
  const loggedUser = useContext(UserContext)
  const userSkills = getLoggedInUserSkills(loggedUser.id)
  console.log("UserContext: ",loggedUser)
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
              deleteSkillCallbackFunc={deleteSkillCallbackFunc}
            />
        <NewSkillForm addSkillCallbackFunc={addSkillCallbackFunc} />
      </ul>
    </div>
  )
}

export default UserDashboard;