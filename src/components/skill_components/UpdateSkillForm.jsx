import { React, useState } from "react";



const UpdateSkillForm = ({updateSkillCallbackFunc, skillInfo}) => {
  const [updatedSkillFormFields, setNewSkillFormFields] = useState({
    name: skillInfo.name,
    description: skillInfo.description,
    time: skillInfo.time,
    tags: skillInfo.tags,
  });

  const [tagsState, setTagsState] = useState([])

  const onSkillNameChange = (e) => {
		setNewSkillFormFields({
			...updatedSkillFormFields,
			name: e.target.value,
		});
	};

	const onDescriptionChange = (e) => {
		setNewSkillFormFields({
			...updatedSkillFormFields,
			description: e.target.value,
		});
	};

	const onTimeChange = (e) => {
		setNewSkillFormFields({
			...updatedSkillFormFields,
			time: e.target.value,
		});
	};

	const onTagChange = (e) => {
    const tagsValue = e.target.value
    // console.log(tagsValue)
		setNewSkillFormFields({
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

  // const removeTag = (tagIndex) => {}

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }
  const onSubmit = (e) => {
		e.preventDefault();
		// updateSkillCallbackFunc(updatedSkillFormFields);
	};

  return (
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
						<input type="submit" value="Add skill" />
				</div>
    </form>
  )
}

export default UpdateSkillForm;