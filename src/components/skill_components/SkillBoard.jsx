import { React } from "react";
import Skill from "./Skill";
import PropTypes from "prop-types";

const SkillBoard = ({ 
  skills, 
  deleteSkillCallbackFunc, 
  updateSkillCallbackFunc, 
  storeRecipSkillCallbackFunc,
  loggedUserTrades,
  }) => {

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
          userName={skill.user_name}
          userId={skill.user_id}
          tags={skill.tags}
          deleteSkillCallbackFunc={deleteSkillCallbackFunc}
          updateSkillCallbackFunc={updateSkillCallbackFunc}
          storeRecipSkillCallbackFunc={storeRecipSkillCallbackFunc}
          loggedUserTrades={loggedUserTrades}
        />
      )
    }
  }

  return (
    <div>
      <ul className="collection">{skillComponents}</ul>
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
      user_name: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired
    })
  ),
};

export default SkillBoard;