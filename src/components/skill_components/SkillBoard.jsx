import React from "react";
import Skill from "./Skill";
import NewSkillForm from "./NewSkillForm";
import PropTypes from "prop-types";

const SkillBoard = ({selectedUser, skills, addSkillCallbackFunc}) => {
  const skillComponents = [];
  if (skills) {
    for (const skill of skills) {
      skillComponents.push(
        <Skill
          key={skill.id}
          id={skill.id}
          name={skill.name}
          description={skill.description}
          time={skill.time}
          userId={skill.userId}
          tags={skill.tags}
        />
      )
    }
  }

  // if (!selectedUser) {
  //   return;
  // }
  return (
    <div>
      <h2>User's Skills</h2>
      <ul>{skillComponents}</ul>
      <NewSkillForm addSkillCallbackFunc={addSkillCallbackFunc}/>
    </div>
  )
}

SkillBoard.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      tags: PropTypes.array,
      // userId: PropTypes.number.isRequired
    })
  ),
  // selectedUser: PropTypes.func.isRequired
};

export default SkillBoard;