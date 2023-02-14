import { React, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
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
    handleSignOut,
    timeoutNav,
    }) => {

  const loggedUser = useContext(UserContext)
  const userSkills = getSpecificUserSkills(loggedUser.id)
  const kickOut = kickOutCallbackFunc(loggedUser)
  console.log("UserContext: ",loggedUser)

  useEffect(()=>kickOut, [])

  return (
    <div>
      <div className="row">
        <div className="col s7 push-s5">
            <ul>
              <h4>My Skills</h4>
              <SkillBoard
                skills={userSkills}
                deleteSkillCallbackFunc={deleteSkillCallbackFunc}
                updateSkillCallbackFunc={updateSkillCallbackFunc}
              />
              <NewSkillForm addSkillCallbackFunc={addSkillCallbackFunc} />
            </ul>
          </div>
        <div className="col s5 pull-s7">
          <h3>Welcome, {loggedUser.user_name}!</h3>
          <div>{loggedUser && (
                <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                )}
          </div>
            <ul>
              <img src={googleUser.picture} alt="" className="circle"></img>
              <li>{loggedUser.user_name}</li>
              {/* <li>First Name: {loggedUser.first_name}</li> */}
              {/* <li>Last Name: {loggedUser.last_name}</li> */}
              <li>City: {loggedUser.city}</li>
              <li>
                Profile Description: {loggedUser.profile_desc}
              </li>
              <li>
                <button onClick={(e)=>timeoutNav("/updateprofile", 0)}>Update Profile</button>
              </li>
            </ul>
          </div>
        </div>
        <ul>
        <h4 className="big-text">My Swaps</h4>
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