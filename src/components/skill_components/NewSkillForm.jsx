import { React, useState, useContext } from "react";
import { UserContext } from "../../App";

// "id": self.skill_id,
// "name": self.name,
// "tags": self.tags,
// "description": self.description,
// "time": self.time,
// "user_id": self.user_id,

const NewSkillForm = ({addSkillCallbackFunc}) => {
  const loggedUser = useContext(UserContext)
  const [newSkillFormFields, setNewSkillFormFields] = useState({
    name: "",
    description: "",
    time: 0,
    tags: [],
    user_name: loggedUser.user_name,
    user_id: loggedUser.id,
  });

  // const [tagsState, setTagsState] = useState([])

  const onSkillNameChange = (e) => {
		setNewSkillFormFields({
			...newSkillFormFields,
			name: e.target.value,
		});
	};

	const onDescriptionChange = (e) => {
		setNewSkillFormFields({
			...newSkillFormFields,
			description: e.target.value,
		});
	};

	const onTimeChange = (e) => {
		setNewSkillFormFields({
			...newSkillFormFields,
			time: e.target.value,
		});
	};

  const addTags = (e) => {
    if (e.key === "Enter") {
      setNewSkillFormFields({
        ...newSkillFormFields,
        tags: [...newSkillFormFields.tags, e.target.value],
      });
      e.target.value = ""
    };
    }

  // const removeTag = (tagIndex) => {}

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }

  const onSubmit = (e) => {
		e.preventDefault();
		addSkillCallbackFunc(newSkillFormFields);
	};

  return (
    <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit}>
      <legend>Add a Skill</legend>
      <div>
        <p>Name: 
        <input name="skill name" 
          value={newSkillFormFields.name} 
          placeholder="enter a skill name..." 
          onChange={onSkillNameChange}/></p>
      </div>
      <div>
        <p>Description: 
        <input name="description" 
          value={newSkillFormFields.description} 
          placeholder="enter a description..." 
          onChange={onDescriptionChange}/></p>
      </div>
      <div>
        <p>Time: 
        <input name="time" 
          value={newSkillFormFields.time} 
          placeholder="enter a time..." 
          onChange={onTimeChange}/></p>
          {/* increment by 15mins */}
      </div>
      <div>
        <section>Tags: 
        <ul>
          {newSkillFormFields.tags.map((tag, index) => {
              return (<li key={index}>{tag}</li>)})
          }
        </ul>
        <input name="tags" 
          type="text" 
          placeholder="enter tag(s)..." 
          onKeyUp={addTags}/></section>
      </div>
      <div>
						<input type="submit" value="Add skill" />
				</div>
    </form>
  )
}

export default NewSkillForm;