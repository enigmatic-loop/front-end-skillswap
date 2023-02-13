import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import "./Trade.css";

const Trade = (props) => {
  const loggedUser = useContext(UserContext)
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
  const acceptDeclineTrade = props.acceptDeclineTrade

	// NOTE - setting setSelectedSkill by passing get user by id and using that obj to display other user's user name and the skill name
  return (
    <div>
      <ul key={id}>
        <li>Sent to: {recipSkill.user_name} for {recipSkill.name}</li> 
        <li>Sent from: {sendSkill.user_name} offering {sendSkill.name}</li>
        <li>{timeStamp}</li>
        {(recipUser === loggedUser.id && recipAccept === false) && (
          <div>
            <button onClick={()=>acceptDeclineTrade(recipUser, id)}>Accept</button>
            <button onClick={()=>acceptDeclineTrade(sendUser, id)}>Decline</button>
          </div>
        )}
      </ul>
    </div>
  ) 
}

export default Trade;