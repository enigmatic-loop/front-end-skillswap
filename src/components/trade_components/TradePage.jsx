import { React, useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "./TradePage.css";

const TradePage = (props) => {
  // SET CURRENT USER, TIMEOUT NAV IN APP ADDTRADE BACK TO CURRENT USER PROFILE

  const loggedUser = useContext(UserContext)
  const loggedUserSkills= props.getSpecificUserSkillsCallbackFunc(loggedUser.id)
  const kickOut = props.kickOutCallbackFunc(loggedUser)
  const addTrade = props.addTradeCallbackFunc 
  const recipUserSelectedSkill = props.selectedSkill

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

  return (
    <div>
      <ul>{mappedSkillNames}</ul>
      {newTradeFormFields.send_skill !== 0 &&
      (<button onClick={()=>addTrade(newTradeFormFields)}>Submit</button>)}
    </div>
  )
}

export default TradePage;