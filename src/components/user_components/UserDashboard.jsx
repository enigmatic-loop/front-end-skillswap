import { React, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import SkillBoard from "../skill_components/SkillBoard";
import NewSkillForm from "../skill_components/NewSkillForm";
import "./UserDashboard.css";
import TradeList from "../trade_components/TradeList";


const UserDashboard = ({ 
    getSpecificUserSkills, 
    addSkillCallbackFunc, 
    skills,
    kickOutCallbackFunc,
    deleteSkillCallbackFunc,
    updateSkillCallbackFunc,
    loggedUserTrades,
    acceptDeclineTradeCallbackFunc,
    googleUser,
    }) => {

  const loggedUser = useContext(UserContext)
  const userSkills = getSpecificUserSkills(loggedUser.id)
  const kickOut = kickOutCallbackFunc(loggedUser)
  console.log("UserContext: ",loggedUser)

  useEffect(()=>kickOut, [])

  return (
    <div>
    <h3>home</h3>
      <ul>
        <img src={googleUser.picture} alt="" className="circle"></img>
        <li>User Name: {loggedUser.user_name}</li>
        <li>First Name: {loggedUser.first_name}</li>
        <li>Last Name: {loggedUser.last_name}</li>
        <li>City: {loggedUser.city}</li>
        <li>
          Profile Description: {loggedUser.profile_desc}
        </li>
        <h3>My Skills</h3>
        <SkillBoard
          skills={userSkills}
          deleteSkillCallbackFunc={deleteSkillCallbackFunc}
          updateSkillCallbackFunc={updateSkillCallbackFunc}
        />
        <NewSkillForm addSkillCallbackFunc={addSkillCallbackFunc} />
        <h3>My Trades</h3>
        <TradeList 
          loggedUserTrades={loggedUserTrades}
          allSkills={skills}
          acceptDeclineTradeCallbackFunc={acceptDeclineTradeCallbackFunc}
        />
      </ul>
    </div>
  )
}

export default UserDashboard;