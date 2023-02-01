import { React, useState } from "react";

// "id": self.skill_id,
// "name": self.name,
// "tags": self.tags,
// "description": self.description,
// "time": self.time,
// "user_id": self.user_id,

const NewSkillForm = ({addSkillCallbackFunc}) => {
  const [newSkillFormFields, setNewSkillFormFields] = useState({
    name: "",
    description: "",
    time: 0,
    tags: [],
    user_id: null,
  });

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

	const onTagChange = (e) => {
    const tagsValue = e.target.value
    const tagArray = tagsValue.split(" ")
    console.log(tagsValue)
		setNewSkillFormFields({
			...newSkillFormFields,
			tags: tagArray,
		});
	};

  const onSubmit = (e) => {
		e.preventDefault();
		addSkillCallbackFunc(newSkillFormFields);
	};

  return (
    <form onSubmit={onSubmit}>
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
      </div>
      <div>
        <p>Tags: 
        <input name="tags" 
          value={newSkillFormFields.tags} 
          placeholder="enter tag(s)..." 
          onChange={onTagChange}/></p>
      </div>
      <div>
						<input type="submit" value="Add skill" />
				</div>
    </form>
  )
}

export default NewSkillForm;