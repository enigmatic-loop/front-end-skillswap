import { React, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { UserContext } from "../../App";
import "./NewSkillForm.scss";



const NewSkillForm = ({addSkillCallbackFunc}) => {
  const loggedUser = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const INITIAL_FORM_DATA = {
    name: "",
    description: "",
    time: 0,
    tags: [],
    user_name: loggedUser.user_name,
    user_id: loggedUser.id,
  }
  const [newSkillFormFields, setNewSkillFormFields] = useState(INITIAL_FORM_DATA);

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

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }

  const onSubmit = (e) => {
		e.preventDefault();
		addSkillCallbackFunc(newSkillFormFields);
    setNewSkillFormFields(INITIAL_FORM_DATA)
	};

  return (
    <div>
      <Button onClick={handleOpen}>Add New Skill</Button>
      <Modal open={open} onClose={handleClose}>
        <Box id="new-skill-modal">
          <form className="form-modal" onSubmit={onSubmit} onKeyDown={preventEnterSubmit}>
            <legend className="title-center">Add a Skill</legend>
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
              <section>Tags: 
              <ul className="tags-input">
                {newSkillFormFields.tags.map((tag, index) => {
                  return (
                    <li className="tag-pad" key={index}>{tag}</li>
                  )})
                }
              </ul>
              <input name="tags" 
                type="text" 
                placeholder="enter tag(s)..." 
                onKeyUp={addTags}/></section>
            </div>
            <div className="submit-button">
              <input type="submit" value="Add skill" />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default NewSkillForm;