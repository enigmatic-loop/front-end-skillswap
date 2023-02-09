import { React, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import "./TradePage.css";

const TradePage = (props) => {

  const loggedUser = useContext(UserContext)
  const loggedUserSkills= props.getSpecificUserSkillsCallbackFunc(loggedUser.id)
  const kickOut = props.kickOutCallbackFunc(loggedUser)
  const addTrade = props.addTradeCallbackFunc 

  
	const INITIAL_FORM_DATA = {
		send_user: loggedUser.id,
		recip_user: "",
		send_skill: "",
		recip_skill: "",
		send_accept: "",
		recip_accept: "",
		send_viewed: "",
		recip_viewed: ""
	}
	
	const mappedSkillNames = loggedUserSkills.map((skill, key) => {
			return (
				<div 
				key={key}>
				{skill.name}
				{/* //onClick={() => {}}> // will add on click even that changes sendUser skill ID on click */}
				</div> 
			)
		})


  return (
    <div>
      <ul>{mappedSkillNames}</ul>
      <button>Submit</button>
    </div>
  )
}

export default TradePage;