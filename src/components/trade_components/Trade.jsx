import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import "./Trade.css";

const Trade = (props) => {
  const loggedUser = useContext(UserContext)
  const userSkills = props.userSkills
  const otherUsersSkill = props.selectedSkill
  // trade param props
  const id = props.id
  const recipAccept = props.recipAccept // to be used for accept/decline functionality
  const recipSkill = props.recipSkill
  const recipUser = props.recipUser
  const recipViewed = props.recipViewed // to be used for css to display what has been read
  const sendAccept = props.sendAccept // to be used for accept/decline functionality
  const sendSkill = props.sendSkill
  const sendUser = props.sendUser
  const sendViewed = props.sendViewed // to be used for css to display what has been read
  const timeStamp = props.timeStamp
  //functions
  const fetchOneSkillBySkillId = props.fetchOneSkillBySkillIdCallbackFunc
  const acceptDeclineTrade = props.acceptDeclineTrade

	// NOTE - setting setSelectedSkill by passing get user by id and using that obj to display other user's user name and the skill name
  const [loggedUsersTradedSkill, setLoggedUsersTradedSkill] = useState({})

  /* Conditional - checking to see if loggedUser is the recipiant or the sender
  so that we can set the logged user's traded skill and the otherUsersSkill */
  const identifyUsers = () => {
    if (recipUser !== loggedUser.id) {
      fetchOneSkillBySkillId(recipSkill)
      for (const skill of userSkills) {
        if (skill.id === sendSkill) {
          setLoggedUsersTradedSkill(skill)
        }
      } 
    } else if (sendUser !== loggedUser.id) {
      fetchOneSkillBySkillId(sendSkill)
      for (const skill of userSkills) {
        if (skill.id === recipSkill) {
          setLoggedUsersTradedSkill(skill)
        }
      }
    }
  }

  const onSubmit = (userId, tradeId) => {
    acceptDeclineTrade(userId, tradeId)
  }

  // console.log('otherUsersSkill', otherUsersSkill)

  useEffect(identifyUsers, [])

  /* Conditional - checks which user is the recip user and sending user, returns html which
  displays which user sent the skill and which user recieved, and which skills weres sent and recieved. */
  return (
    <div>
      {otherUsersSkill.id === recipSkill && (
        <div>
        <ul key={id}>
          <li>Sent to: {otherUsersSkill.user_name} for {otherUsersSkill.name}</li> 
          <li>Sent from: {loggedUser.user_name} offering {loggedUsersTradedSkill.name}</li>
          <li>{timeStamp}</li>
        </ul>
      </div>
      )}
      {otherUsersSkill.id === sendSkill && (
      <div>
        <ul key={id}>
          <li>Sent to: {loggedUser.user_name} for {loggedUsersTradedSkill.name}</li> 
          <li>Sent from: {otherUsersSkill.user_name} offering {otherUsersSkill.name}</li>
          <li>{timeStamp}</li>
          <button onClick={()=>onSubmit(recipUser, id)}>Accept</button>
          <button onClick={()=>onSubmit(sendUser, id)}>Decline</button>
        </ul>
      </div>
      )}
    </div>
  )
  /*
  if (otherUsersSkill.id === recipSkill) {
    return (
      <div>
        <ul key={id}>
          <li>Sent to: {otherUsersSkill.user_name} for {otherUsersSkill.name}</li> 
          <li>Sent from: {loggedUser.user_name} offering {loggedUsersTradedSkill.name}</li>
          <li>{timeStamp}</li>
        </ul>
      </div>
    )
  } else if (otherUsersSkill.id === sendSkill) { 
    return (
      <div>
        <ul key={id}>
          <li>Sent to: {loggedUser.user_name} for {loggedUsersTradedSkill.name}</li> 
          <li>Sent from: {otherUsersSkill.user_name} offering {otherUsersSkill.name}</li>
          <li>{timeStamp}</li>
          <button onClick={()=>onSubmit(recipUser, id)}>Accept</button>
          <button onClick={()=>onSubmit(sendUser, id)}>Decline</button>
        </ul>
      </div>
    ) 
  } */
}

export default Trade;