import { React, useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";

// "id": self.skill_id,
// "name": self.name,
// "tags": self.tags,
// "description": self.description,
// "time": self.time,
// "user_name": self.user_name,
// "user_id": self.user_id,

const Skill = ({id, name, tags, description, time, userId, userName, deleteSkillCallbackFunc, updateSkillCallbackFunc}) => {
  const loggedUser = useContext(UserContext)
  const [editSkill, setEditSkill] = useState(false);
  const [updatedSkillFormFields, setUpdatedSkillFormFields] = useState({
    name: name,
    description: description,
    time: time,
    tags: tags,
    user_name: loggedUser.user_name,
    user_id: loggedUser.id,
  });
  const [tagsState, setTagsState] = useState([])

  const toggleEditSkill = () => {
    setEditSkill(!editSkill)
  }

  const removeOwnedSkill = () => {
    deleteSkillCallbackFunc(id);
  };
  // const skillInfo = {
  //   id:{id},
  //   name:{name},
  //   description:{description},
  //   time:{time},
  //   tags:{tags}
  // }

  // FORM FUNCTIONS
  const onSkillNameChange = (e) => {
		setUpdatedSkillFormFields({
			...updatedSkillFormFields,
			name: e.target.value,
		});
	};

	const onDescriptionChange = (e) => {
		setUpdatedSkillFormFields({
			...updatedSkillFormFields,
			description: e.target.value,
		});
	};

	const onTimeChange = (e) => {
		setUpdatedSkillFormFields({
			...updatedSkillFormFields,
			time: e.target.value,
		});
	};

	const onTagChange = (e) => {
    const tagsValue = e.target.value
    // console.log(tagsValue)
		setUpdatedSkillFormFields({
			...updatedSkillFormFields,
			tags: tagsValue,
		});
	};

  const addTags = (e) => {
    if (e.key === "Enter") {
      // console.log(e.target.value)
      setTagsState([...tagsState, e.target.value])
      console.log(tagsState)
      e.target.value = ""
    }
  }

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }

  const onSubmit = (e) => {
		e.preventDefault();
		updateSkillCallbackFunc(id, updatedSkillFormFields);
	};

  return (
    <div>
      <ul key={id}>
        { !editSkill && (
          <div>
          <li>Skill: {name}</li>
          <li>Description: {description}</li>
          <li>Time: {time}</li>
          <li>Tags: {tags}</li>
          <li>Owned By: {userName}</li>
          </div>)}
        { editSkill && (
          <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit}>
          <legend>Update Skill</legend>
          <div>
            <p>Name: 
            <input name="skill name" 
              value={updatedSkillFormFields.name} 
              placeholder="enter a skill name..." 
              onChange={onSkillNameChange}/></p>
          </div>
          <div>
            <p>Description: 
            <input name="description" 
              value={updatedSkillFormFields.description} 
              placeholder="enter a description..." 
              onChange={onDescriptionChange}/></p>
          </div>
          <div>
            <p>Time: 
            <input name="time" 
              value={updatedSkillFormFields.time} 
              placeholder="enter a time..." 
              onChange={onTimeChange}/></p>
              {/* increment by 15mins */}
          </div>
          <div>
            <section>Tags: 
            <ul>
              {tagsState.map((tag, index) => {
                  return (<li key={index}>{tag}</li>)})
              }
            </ul>
            <input name="tags" 
              // value={newSkillFormFields.tags}
              onChange={onTagChange}
              type="text" 
              placeholder="enter tag(s)..." 
              onKeyUp={addTags}/></section>
          </div>
          <div>
                <input type="submit" value="Done" />
            </div>
        </form>)}
        {loggedUser.user_name === userName && (
          <div>
            <button onClick={removeOwnedSkill} id={id}>
            Delete Skill
            </button>
            { !editSkill && (
            <button onClick={toggleEditSkill}>
            Update Skill
            </button>)}
          </div>
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