import React from "react";
import PropTypes from "prop-types";

// "id": self.skill_id,
// "name": self.name,
// "tags": self.tags,
// "description": self.description,
// "time": self.time,
// "user_id": self.user_id,

const Skill = ({id, name, tags, description, time, userId}) => {
  const tagList = [];
  if (tags) {
    for (const tag of tags) {
      tagList.push(tag, " ")
    }
  }

  return (
    <div>
      <ul key={id}>
        <li>Skill: {name}</li>
        <li>Description: {description}</li>
        <li>Time: {time}</li>
        <li>Tags: {tagList}</li>
        <li>User ID: {userId}</li>
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
  // userId: PropTypes.number.isRequired
}

export default Skill;