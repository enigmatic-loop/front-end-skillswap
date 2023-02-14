import { React, useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import "./Skill.scss";

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
  // const [hideSwapToggle, setHideSwapToggle] = useState(false)
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

  //   const removeTag = (tagIndex) => {
  //   const newTagList = updatedSkillFormFields.tags.filter((tag, index) => index !== tagIndex)
  //   setUpdatedSkillFormFields({
  //     ...updatedSkillFormFields, 
  //     tags: newTagList
  //   })
  // }

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }

  const onSubmit = (e) => {
		e.preventDefault();
		updateSkillCallbackFunc(id, updatedSkillFormFields);
	};

  // validates that user has not traded for skill, hides swap button if true
  // const validateSwap = (currentSkillId) => {
  //   // console.log('HI THIS IS LOGGED USER TRADES', loggedUserTrades) //delete me
  //   // BIG NOTE FOR FIDAY 2/10 - Update logic below to check for any combination of the recip_skill id and the send_skill id in the trades
  //   if (loggedUserTrades) {
  //     console.log(loggedUserTrades)
  //     for (const trade of loggedUserTrades) {
  //       if (trade.recip_skill === currentSkillId) {
  //         setHideSwapToggle(true)
  //       }
  //   }}
  // }
  

  // useEffect(()=>validateSwap(id), []) // VALIDATE SWAP
  // const sendSkillObj

  return (
    <div className="collection-item">
      <li key={id}>
        { !editSkill && (
          <div>
            <div className="med-text">{name} - {userName}</div> 
            <div className="small-text">Time: {time}</div>
            <div className="small-text"><b>Description:</b> {description}</div>
            <div className="small-text"><b>Tags:</b> <ul>
                {tags && (
                  updatedSkillFormFields.tags.map((tag, index) => {
                    return (<li key={index} className="horizontal-li">{tag}</li>)})
                )}
              </ul>
            </div>
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
              {/* increment by 15mins */}
          </div>
          <div>
            <section>Tags: 
            <ul>
              {tags && (updatedSkillFormFields.tags.map((tag, index) => {
                return (
                  <li key={index}>{tag}</li>
                  // {/* <button onClick={removeTag}>x</button> */}
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
        {/* {loggedUser.user_name !== userName &&( hideSwapToggle === false && 
          (<div>
            <button onClick={()=>storeRecipSkillCallbackFunc(id)}>
            Swap
            </button>
          </div>)
        )} */}
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