import { React, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";

// "id": self.skill_id,
// "name": self.name,
// "tags": self.tags,
// "description": self.description,
// "time": self.time,
// "user_name": self.user_name,
// "user_id": self.user_id,

const Skill = ({id, name, tags, description, time, userId, userName, deleteSkillCallbackFunc}) => {
  const loggedUser = useContext(UserContext)
  // const tagList = [];
  // if (tags) {
  //   for (const tag of tags) {
  //     tagList.push(tag, " ")
  //   }
  // }

  const removeOwnedSkill = () => {
    deleteSkillCallbackFunc(id);
  };

  return (
    <div>
      <ul key={id}>
        <li>Skill: {name}</li>
        <li>Description: {description}</li>
        <li>Time: {time}</li>
        <li>Tags: {tags}</li>
        <li>Owned By: {userName}</li>
        {loggedUser.user_name === userName && (
          <button onClick={removeOwnedSkill} id={id}>
          Delete Skill
          </button>
        )}
      </ul>
    </div>
  )
}

Skill.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  tags: PropTypes.array,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
}

export default Skill;