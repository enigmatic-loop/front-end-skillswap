import { React, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import SkillBoard from "../skill_components/SkillBoard";
import NewSkillForm from "../skill_components/NewSkillForm";
import "./UserDashboard.scss";
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
    handleSignOut,
    timeoutNav,
    }) => {

  const loggedUser = useContext(UserContext)
  const userSkills = getSpecificUserSkills(loggedUser.id)
  const kickOut = kickOutCallbackFunc(loggedUser)

  useEffect(()=>kickOut, [])

  return (
    <div>
      <div className="row">
        <div className="col s7 push-s5">
            <ul className="top-padding">
              <h4 className="big-text">My Skills</h4>
              <SkillBoard
                skills={userSkills}
                deleteSkillCallbackFunc={deleteSkillCallbackFunc}
                updateSkillCallbackFunc={updateSkillCallbackFunc}
              />
              <NewSkillForm addSkillCallbackFunc={addSkillCallbackFunc} />
            </ul>
          </div>
        <div className="col s5 pull-s7">
          <h3 className="lorge-text">Welcome, {loggedUser.user_name}!</h3>
          <div>{loggedUser && (
                <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                )}
          </div>
            <ul>
              <img src={loggedUser.user_icon} alt="" className="circle"></img>
              <li>{loggedUser.user_name}</li>
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