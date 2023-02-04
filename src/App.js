import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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
  //STATE VARIABLES
  const [userNames, setUserNames] = useState([]);
  const [user, setUser] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

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
    timeoutNav("/", 0);
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

  //kick back to landing page
  const kickOut = (obj) => {
    // Helper func - kicks user back to landing page if obj stored in obj parameter is empty
    if (Object.keys(obj).length === 0) {
      timeoutNav("/", 100);
    }
  };

  // USER FUNCTIONS

  const URL = "http://localhost:5000";

  const fetchOneUserByUserName = (userName) => {
    axios
      .get(`${URL}/users/username/${userName}`)
      .then((res) => {
        // console.log(res.data.user);
        setUser(res.data.user);
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
        // console.log("axios response: ", res); //delete me
        validateLogin(googleUser);
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
      console.log("in validate login");
      axios
        .get(`${URL}/users/email/${googleObj.email}`)
        .then((res) => {
          console.log(".then conditional activated!");
          console.log("axios response: ", res); //delete me
          if (
            googleObj.email_verified === true &&
            googleObj.email === res.data.user.email
          ) {
            console.log("aaaaaaaaaaa", res.data.user); //delete me
            setLoggedUser(res.data.user);
            timeoutNav("/home", 100);
          } else {
            timeoutNav("/", 100);
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

  const updateUser = (updatedUserInfo) => {
    if (
      updatedUserInfo.first_name.length < 1 ||
      updatedUserInfo.last_name.length < 1
    ) {
      setResponseMsg("Please complete all required fields");
    } else {
      axios
        .patch(`${URL}/users/${loggedUser.id}/update_user`, updatedUserInfo)
        .then((res) => {
          setResponseMsg(JSON.parse(res.request.response).details);
          for (let objKey of Object.keys(updatedUserInfo)) {
            loggedUser[objKey] = updatedUserInfo[objKey];
          }

          alert(`${loggedUser.user_name}'s profile updated`);
          timeoutNav("/home", 500);
        })
        .catch((error) => {
          console.log(error); //delete me
          setResponseMsg(JSON.parse(error.request.response).details);
        });
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

  const getLoggedInUserSkills = (userId) => {
    const loggedInUserSkills = [];
    for (const skill of allSkills) {
      if (skill.user_id === userId) {
        loggedInUserSkills.push(skill);
      }
    }
    return loggedInUserSkills;
  };

  const addSkill = (newSkillInfo) => {
    axios
      .post(`${URL}/skills`, newSkillInfo)
      .then((res) => {
        console.log("axios response: ", res);
      })
      .catch((error) => {
        console.log("axios .catch error: ", error);
      });
  };

  return (
    <div className="App">
      {/* google login API */}
      <div id="signInDiv"></div>
      {Object.keys(loggedUser).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {Object.keys(loggedUser).length !== 0 && (
        <Header googleUser={googleUser}></Header>
      )}
      {Object.keys(loggedUser).length !== 0 && (
        <SearchBar
          placeholder={"Enter a username..."}
          userNames={userNames}
          fetchOneUserByUserName={fetchOneUserByUserName}
        ></SearchBar>
      )}
      <UserContext.Provider value={loggedUser}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <UserDashboard
                getLoggedInUserSkills={getLoggedInUserSkills}
                addSkillCallbackFunc={addSkill}
                skills={allSkills}
                kickOutCallbackFunc={kickOut}
              />
            }
          />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route
            path="/skills"
            element={
              <SkillBoard skills={allSkills} addSkillCallbackFunc={addSkill} />
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
                kickOutCallbackFunc={kickOut}
              />
            }
          />
          <Route
            path="/updateprofile"
            element={
              <UpdateProfileForm
                updateUserCallbackFunc={updateUser}
                responseMsg={responseMsg}
                kickOutCallbackFunc={kickOut}
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
