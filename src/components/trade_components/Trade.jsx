import { React, useContext } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { UserContext } from "../../App";
import "./Trade.scss";

const Trade = (props) => {
  const loggedUser = useContext(UserContext)
  // trade param props
  const id = props.id
  const recipAccept = props.recipAccept // to be used for accept/decline functionality
  const recipSkill = props.recipSkill
  const recipUser = props.recipUser
  // const recipViewed = props.recipViewed // to be used for css to display what has been read
  const sendSkill = props.sendSkill
  const sendUser = props.sendUser
  // const sendViewed = props.sendViewed // to be used for css to display what has been read
  const timeStamp = props.timeStamp
  //functions
  const acceptDeclineTrade = props.acceptDeclineTrade

  return (
    <div className="collection-item">
      <li key={id}>
        <div></div>
        {sendSkill.user_name}'s skill: {sendSkill.name} <br />
        for {recipSkill.user_name}'s skill: {recipSkill.name} <br />
        {timeStamp}
        {(recipUser === loggedUser.id && recipAccept === false) && (
          <Stack direction="row" spacing={2} className="center-button">
            <Button variant="contained" color="success" onClick={()=>acceptDeclineTrade(recipUser, id)}>Accept</Button>
            <Button variant="contained" color="error" onClick={()=>acceptDeclineTrade(sendUser, id)}>Decline</Button>
          </Stack>
        )}
      </li>
    </div>
  ) 
}

export default Trade;