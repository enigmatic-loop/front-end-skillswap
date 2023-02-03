import "./App.css";
import { useEffect, useState, createContext } from "react";
import { Routes, Route, redirect } from "react-router-dom";
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
    validateLogin(userObject); //wip
    // console.log("validate login: ", loggedUser); //delete me
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setGoogleUser({});
    setLoggedUser({});
    // console.log("logged user on sign out: ", loggedUser); //delete me
    document.getElementById("signInDiv").hidden = false;
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

  // const timeout = (delay) => {
  //   return new Promise((res) => setTimeout(res, delay));
  // };

  const timeout = (content, time) => {
    setTimeout(() => {
      console.log(content);
    }, time);
  };

  // USER FUNCTIONS
  const [userNames, setUserNames] = useState([]);
  const [user, setUser] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

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
        // console.log("axios response: ", res);
        return alert(
          `Account Created. Welcome to SkillSwap, ${newUserInfo.user_name}!`
        );
      })
      .catch((error) => {
        // console.log("axios .catch error: ", error.request.response); //delete me
        setResponseMsg(JSON.parse(error.request.response).details);
        // console.log("details:", JSON.parse(error.request.response).details); //delete me
      });
  };

  const validateLogin = (googleObj) => {
    axios
      .get(`${URL}/users/email/${googleObj.email}`)
      .then((res) => {
        // console.log(res.data.user);
        // console.log("I'm in validateLogin");
        // console.log("validate googleUser: ", googleUser); //delete me
        if (googleObj.email_verified === true) {
          setLoggedUser(res.data.user);
          console.log("get response obj: ", res.data.user); //delete me
          // console.log("logged user inside validateLogin: ", loggedUser); //delete me
        }
        // console.log("user state: " + JSON.stringify(user));
      })
      .catch((error) => {
        setResponseMsg(JSON.parse(error.request.response).details);
        alert(responseMsg);
      });
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
        ></SearchBar>
      )}
      <UserContext.Provider value={loggedUser}>
        <Routes>
          <Route path="/" element={<LandingPage loggedUser={loggedUser} />} />
          <Route
            path="/home"
            element={
              <UserDashboard
                getLoggedInUserSkills={getLoggedInUserSkills}
                addSkillCallbackFunc={addSkill}
                skills={allSkills}
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
