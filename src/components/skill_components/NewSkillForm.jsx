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
  return (
    <form>
      <legend>Add a Skill</legend>
      <div>
        <p>Name: 
        <input name="skill name" 
          value={newSkillFormFields.name} 
          placeholder="enter a skill name..." /></p>
      </div>
      <div>
        <p>Description: 
        <input name="description" 
          value={newSkillFormFields.description} 
          placeholder="enter a description..." /></p>
      </div>
      <div>
        <p>Time: 
        <input name="time" 
          value={newSkillFormFields.time} 
          placeholder="enter a time..." /></p>
      </div>
      <div>
        <p>Tags: 
        <input name="tags" 
          value={newSkillFormFields.tags} 
          placeholder="enter tag(s)..." /></p>
      </div>
      <div>
						<input type="submit" value="Add skill" />
				</div>
    </form>
  )
}

export default NewSkillForm;