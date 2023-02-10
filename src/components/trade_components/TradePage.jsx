import { React, useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "./TradePage.css";

const TradePage = (props) => {
  // TURN INTO MODEL????????

  const loggedUser = useContext(UserContext)
  const loggedUserSkills= props.getSpecificUserSkillsCallbackFunc(loggedUser.id)
  const kickOut = props.kickOutCallbackFunc(loggedUser)
  const addTrade = props.addTradeCallbackFunc 
  const recipUserSelectedSkill = props.selectedSkill
  const timeoutNav = props.timeoutNav

	const INITIAL_FORM_DATA = {
		send_user: loggedUser.id,
		recip_user: recipUserSelectedSkill.user_id,
		send_skill: 0,
		recip_skill: recipUserSelectedSkill.id,
		send_accept: true,
		recip_accept: false,
		send_viewed: true,
		recip_viewed: false
	}

	const [newTradeFormFields, setNewTradeFormFields] = useState(INITIAL_FORM_DATA);

  const onUserSkillClick = (skillId) => {
    // console.log(skillId) //delete me
    setNewTradeFormFields({...newTradeFormFields, send_skill: skillId})
  }

  // console.log(newTradeFormFields)

	const mappedSkillNames = loggedUserSkills.map((skill, key) => {
			return (
				<div 
				key={key}
				onClick={() => onUserSkillClick(skill.id)}> 
				{skill.name}
				</div> 
			)
		})
  
  console.log("Logged User Skills: ", loggedUserSkills)

  return (
    <div>
      {loggedUserSkills.length > 0 && (
      <div>
        <h3>Choose one of your skills to trade</h3>
        <ul>{mappedSkillNames}</ul>
		<h3>{recipUserSelectedSkill.user_name}'s skill:</h3>
		<ul>
			<li>Name: {recipUserSelectedSkill.name}</li>
			<li>Time: {recipUserSelectedSkill.time}</li>
			<li>Description: {recipUserSelectedSkill.description}</li>
		</ul>
        {newTradeFormFields.send_skill !== 0 &&
        (<button onClick={()=>addTrade(newTradeFormFields)}>Submit</button>)}
      </div>)}
      {loggedUserSkills < 1 && (
        <div>
          <h3>You don't have any skills!</h3>
          <div><p onClick={() => {timeoutNav("home", 100)}}>Click here</p> to add skills</div>
        </div>
      )}
    </div>
  )
}

export default TradePage;