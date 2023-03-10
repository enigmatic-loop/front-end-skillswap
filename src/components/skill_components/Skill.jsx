import { React, useContext, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import "./Skill.scss";
import { black } from "material-ui/styles/colors";

const Skill = ({
    id, 
    name, 
    tags, 
    description, 
    time, 
    userId, 
    userName, 
    deleteSkillCallbackFunc, 
    updateSkillCallbackFunc,
    storeRecipSkillCallbackFunc,
    loggedUserTrades,
  }) => {

  const loggedUser = useContext(UserContext)
  const [editSkill, setEditSkill] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedSkillFormFields, setUpdatedSkillFormFields] = useState({
    name: name,
    description: description,
    time: time,
    tags: tags,
    user_name: loggedUser.user_name,
    user_id: loggedUser.id,
  });

  const toggleEditSkill = () => {
    setEditSkill(!editSkill)
  }

  const removeOwnedSkill = () => {
    deleteSkillCallbackFunc(id);
  };

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

  const addTags = (e) => {
    if (e.key === "Enter") {
      if (tags) {
      setUpdatedSkillFormFields({
        ...updatedSkillFormFields,
        tags: [...updatedSkillFormFields.tags, e.target.value],
      })}
      else {
      setUpdatedSkillFormFields({
        ...updatedSkillFormFields,
        tags: [e.target.value],
      })
      }
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

  const theme = createTheme({
    palette: {
      primary: {
        main: black
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      }
    }
  })

  return (
    <div className="collection-item">
      <li key={id}>
        { !editSkill && (
          <div>
            <ThemeProvider theme={theme}>
            <Button color="neutral" onClick={handleOpen}>{name} - {userName}</Button>
              <Modal open={open} onClose={handleClose}>
                <Box id="new-skill-modal" className="form-modal">
                  <div className="med-text">{name} - {userName}</div>
                  <div className="small-text">Time: {time}</div>
                  <div className="small-text">Description: {description}</div>
                  <div className="small-text">Tags: </div>
                    {tags && (
                      updatedSkillFormFields.tags.map((tag, index) => {
                        return (<li key={index} className="horizontal-li">
                          <div className="chip">
                            {tag}
                          </div>
                          </li>)})
                    )}
                </Box>
              </Modal>
              </ThemeProvider>
          </div>)}
        { editSkill && (
          <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit} >
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
          </div>
          <div>
            <section>Tags: 
            <ul>
              {tags && (updatedSkillFormFields.tags.map((tag, index) => {
                return (
                  <li key={index}>{tag}</li>
                )})
              )}
            </ul>
            <input name="tags"
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
        {loggedUser.user_name !== userName &&( <div>
            <button onClick={()=>storeRecipSkillCallbackFunc(id)}>
            Swap
            </button>
          </div>
        )}
      </li>
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