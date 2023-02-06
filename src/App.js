import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  redirect,
} from "react-router-dom";
import { useEffect, useState, createContext } from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import UserProfile from "./components/user_components/UserProfile";
import UserDashboard from "./components/user_components/UserDashboard";
import UpdateProfileForm from "./components/user_components/UpdateProfileForm";
import UserSignUpForm from "./components/user_components/UserSignUpForm";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import SkillBoard from "./components/skill_components/SkillBoard";

export const UserContext = createContext(null);

function App() {
  //google login stuff

  const [googleUser, setGoogleUser] = useState({});

  function handleGoogleCallbackResponse(response) {
    // console.log("JWT encoded token: " + response.credential); //delete me
    let userObject = jwt_decode(response.credential);
    console.log("google response: ", userObject); //delete me
    console.log(userObject.email);
    setGoogleUser(userObject);
    // console.log("validate login: ", loggedUser); //delete me
    document.getElementById("signInDiv").hidden = true;
    validateLogin(userObject);
  }

  function handleSignOut(event) {
    setGoogleUser({});
    setLoggedUser({});
    console.log("logged user on sign out: ", loggedUser); //delete me
    document.getElementById("signInDiv").hidden = false;
    timeoutNav("/", 100);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleGoogleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  // GENERAL FUNCTIONS
  const [responseMsg, setResponseMsg] = useState("");

  const navigate = useNavigate();

  //timer navigation function
  const timeoutNav = (location, time) => {
    setTimeout(() => {
      navigate(location);
    }, time);
  };

  // USER FUNCTIONS
  const [userNames, setUserNames] = useState([]);
  const [selectedUser, setselectedUser] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const URL = "http://localhost:5000";

  const fetchOneUserByUserName = (userName) => {
    axios
      .get(`${URL}/users/username/${userName}`)
      .then((res) => {
        // console.log(res.data.user);
        setselectedUser(res.data.user);
        // console.log("user state: " + JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllUserNames = () => {
    axios
      .get(`${URL}/users`)
      .then((res) => {
        const userNameResList = res.data.map((user) => {
          // console.log(user);
          return user.user_name;
        });
        setUserNames(userNameResList);
        const usersResList = res.data.map((user) => {
          // console.log(user);
          return user;
        });
        setAllUsers(usersResList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchOneUserById = (userId) => {
  //   axios
  //     .get(`${URL}/users/${userId}`)
  //     .then((res) => {
  //       console.log(res.data.user.user_name);
  //       return res.data.user.user_name;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(fetchAllUserNames, []);

  const addUser = (newUserInfo) => {
    axios
      .post(`${URL}/users`, newUserInfo)
      .then((res) => {
        setResponseMsg(JSON.parse(res.request.response).details);
        // console.log("axios response: ", res);
        setLoggedUser(newUserInfo);
        alert(
          `Account Created. Welcome to SkillSwap, ${newUserInfo.user_name}!`
        );
        timeoutNav("/home", 500);
      })
      .catch((error) => {
        // console.log("axios .catch error: ", error.request.response); //delete me
        setResponseMsg(JSON.parse(error.request.response).details);
        // console.log("details:", JSON.parse(error.request.response).details); //delete me
      });
  };

  const validateLogin = (googleObj) => {
    try {
      axios
        .get(`${URL}/users/email/${googleObj.email}`)
        .then((res) => {
          if (
            googleObj.email_verified === true &&
            googleObj.email === res.data.user.email
          ) {
            setLoggedUser(res.data.user);
            timeoutNav("/home", 100);
          }
        })
        .catch((error) => {
          alert(JSON.parse(error.request.response).details);
          timeoutNav("/", 500);
        });
    } catch (error) {
      console.log(error);
    } finally {
      timeoutNav("/signup", 100);
    }
  };

  // SKILL FUNCTIONS
  const [allSkills, setAllSkills] = useState([]);

  const fetchAllSkills = () => {
    axios
      .get(`${URL}/skills`)
      .then((res) => {
        const skillResList = res.data.map((skill) => {
          return skill;
        });
        // console.log(userNameResList);
        setAllSkills(skillResList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchAllSkills, []);

  const getSpecificUserSkills = (userId) => {
    const specificUserSkills = [];
    for (const skill of allSkills) {
      if (skill.user_id === userId) {
        specificUserSkills.push(skill);
      }
    }
    return specificUserSkills;
  };

  const addSkill = (newSkillInfo) => {
    axios
      .post(`${URL}/skills`, newSkillInfo)
      .then((res) => {
        console.log("axios response: ", res);
        const newSkills = [...allSkills];
        const newSkillJSON = {
          ...newSkillInfo,
        };
        newSkills.push(newSkillJSON);
        setAllSkills(newSkills);
        fetchAllSkills();
      })
      .catch((error) => {
        console.log("axios .catch error: ", error);
      });
  };

  const deleteSkill = (skillId) => {
    axios
      .delete(`${URL}/skills/${skillId}`)
      .then(() => {
        const newSkillList = [];
        let deletedSkillName = "";
        for (const skill of allSkills) {
          if (skill.id !== skillId) {
            newSkillList.push(skill);
          } else {
            deletedSkillName = skill.name;
          }
        }
        setAllSkills(newSkillList);
        alert(`${deletedSkillName} skill succesfully deleted`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //allows update skill to run more than once
  const updateSkill = (skillId, updatedSkillInfo) => {
    axios
      .patch(`${URL}/skills/${skillId}/update_skill`, updatedSkillInfo)
      .then(() => {
        const newSkillList = [];
        for (const skill of allSkills) {
          if (skill.id !== skillId) {
            newSkillList.push(skill);
          } else {
            const updatedSkill = {
              name: updatedSkillInfo.name,
              description: updatedSkillInfo.description,
              time: updatedSkillInfo.time,
              tags: updatedSkillInfo.tags,
              user_name: skill.user_name,
              user_id: skill.user_id,
            };
            newSkillList.push(updatedSkill);
          }
        }
        setAllSkills(newSkillList);
        fetchAllSkills();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {/* google login API */}
      <div id="signInDiv"></div>
      {Object.keys(googleUser).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {Object.keys(googleUser).length !== 0 && (
        <Header googleUser={googleUser}></Header>
      )}
      {Object.keys(googleUser).length !== 0 && (
        <SearchBar
          placeholder={"Enter a username..."}
          userNames={userNames}
          fetchOneUserByUserName={fetchOneUserByUserName}
          timeoutNav={timeoutNav}
        ></SearchBar>
      )}
      <UserContext.Provider value={loggedUser}>
        <Routes>
          <Route path="/" element={<LandingPage loggedUser={loggedUser} />} />
          <Route
            path="/home"
            element={
              <UserDashboard
                getSpecificUserSkills={getSpecificUserSkills}
                addSkillCallbackFunc={addSkill}
                updateSkillCallbackFunc={updateSkill}
                deleteSkillCallbackFunc={deleteSkill}
                skills={allSkills}
              />
            }
          />
          <Route
            path="/userprofile"
            element={
              <UserProfile
                selectedUser={selectedUser}
                getSpecificUserSkills={getSpecificUserSkills}
              />
            }
          />
          <Route
            path="/skills"
            element={
              <SkillBoard
                skills={allSkills}
                deleteSkillCallbackFunc={deleteSkill}
                updateSkillCallbackFunc={updateSkill}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <UserSignUpForm
                googleUser={googleUser}
                responseMsg={responseMsg}
                addUserCallbackFunc={addUser}
                validateLoginCallbackFunc={validateLogin}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
      {/* user profile will load to new page */}
      {/* <UserProfile profile={googleUser}></UserProfile> */}
    </div>
  );
}

export default App;
