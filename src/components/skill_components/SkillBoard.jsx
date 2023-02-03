import { React } from "react";
import Skill from "./Skill";
import PropTypes from "prop-types";

const SkillBoard = ({ skills }) => {
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
          userId={skill.user_id}
          tags={skill.tags}
        />
      )
    }
  }

  // if (!selectedUser) {
  //   return;
  // }
  const skillBoardTitle = "Skills"
  return (
    <div>
      <h1>{skillBoardTitle}</h1>
      <ul>{skillComponents}</ul>
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