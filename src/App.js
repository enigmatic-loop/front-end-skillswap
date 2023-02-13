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
import TradePage from "./components/trade_components/TradePage";

export const UserContext = createContext(null);

function App() {
  const URL = process.env.REACT_APP_BACKEND_URL;
  //STATE VARIABLES
  //user variables
  const [userNames, setUserNames] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [loggedUser, setLoggedUser] = useState({});

  //skill variables
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState({});

  //trade variables
  const [loggedUserTrades, setLoggedUserTrades] = useState([]);

  //general variables
  const [responseMsg, setResponseMsg] = useState("");

  //google login stuff
  const [googleUser, setGoogleUser] = useState({});

  function handleGoogleCallbackResponse(response) {
    // console.log("JWT encoded token: " + response.credential); //delete me
    let userObject = jwt_decode(response.credential);
    // console.log("google response: ", userObject); //delete me
    // console.log(userObject.email);
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
      timeoutNav("/", 0);
    }
  };

  // USER FUNCTIONS

  const fetchOneUserByUserName = (userName) => {
    axios
      .get(`${URL}/users/username/${userName}`)
      .then((res) => {
        setSelectedUser(res.data.user);
        return res.data.user;
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
          return user.user_name;
        });
        setUserNames(userNameResList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchAllUserNames, []);

  const addUser = (newUserInfo) => {
    axios
      .post(`${URL}/users`, newUserInfo)
      .then((res) => {
        setResponseMsg(JSON.parse(res.request.response).details);
        validateLogin(googleUser);
        setResponseMsg("");
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
    axios
      .get(`${URL}/users/email/${googleObj.email}`)
      .then((res) => {
        if (
          googleObj.email_verified === true &&
          googleObj.email === res.data.user.email
        ) {
          setLoggedUser(res.data.user);
          fetchLoggedUsersTradesById(res.data.user.id);
          timeoutNav("/home", 100);
        } else {
          timeoutNav("/", 100);
        }
      })
      .catch(() => {
        timeoutNav("/signup", 100);
      });
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

  const fetchAllSkills = () => {
    axios
      .get(`${URL}/skills`)
      .then((res) => {
        const skillResList = res.data.map((skill) => {
          return skill;
        });
        // console.log(userNameResList); //delete me
        setAllSkills(skillResList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchAllSkills, []);

  const fetchOneSkillBySkillId = (skillId) => {
    axios
      .get(`${URL}/skills/${skillId}`)
      .then((res) => {
        setSelectedSkill(res.data.skill);
        fetchOneUserByUserName(res.data.skill.user_name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        // console.log("axios response: ", res); //delete me
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

  // TRADE FUNCTIONS

  const storeRecipSkill = (id) => {
    fetchOneSkillBySkillId(id);
    timeoutNav("trade", 100);
  };

  const addTrade = (newTradeObj) => {
    axios
      .post(`${URL}/trades`, newTradeObj)
      .then((res) => {
        console.log("axios response: ", res); // delete me
        setLoggedUserTrades([...loggedUserTrades, newTradeObj]);
        alert("Skills succesfully swapped!");
        timeoutNav("userprofile", 100);
      })
      .catch((error) => {
        setResponseMsg(JSON.parse(error.request.response).details);
        console.log("axios .catch error: ", error); // delete me
      });
  };

  const fetchLoggedUsersTradesById = (userId) => {
    console.log("fetchLoggedUsersTradesById");

    axios
      .get(`${URL}/trades/${userId}`)
      .then((res) => {
        // console.log("RESPONSE,,,,,,", res); //delete me
        const tradesResList = res.data.map((trade) => {
          return trade;
        });
        // console.log("THIS SHOULD HAVE USERS TRADES", tradesResList); //delete me
        setLoggedUserTrades(tradesResList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptDeclineTrade = (userId, tradeId) => {
    // if user accepts then we send their ID through the patch toggle
    // if user declines then we send other user ID through patch toggle
    console.log("URL", `${URL}/trades/${tradeId}/${userId}/toggle_accept`);
    axios
      .patch(`${URL}/trades/${tradeId}/${userId}/toggle_accept`)
      .then((res) => {
        let newLoggedUserTrades = [];
        const newTradeJSON = {
          ...res.data.trade,
        };

        for (const trade of loggedUserTrades) {
          if (trade.id !== newTradeJSON.id) {
            newLoggedUserTrades.push(trade);
          }
        }
        newLoggedUserTrades.push(newTradeJSON);

        setLoggedUserTrades(newLoggedUserTrades);
      })
      .catch((error) => {
        console.log(error);
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
          timeoutNav={timeoutNav}
        ></SearchBar>
      )}
      <UserContext.Provider value={loggedUser}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <UserDashboard
                getSpecificUserSkills={getSpecificUserSkills}
                addSkillCallbackFunc={addSkill}
                updateSkillCallbackFunc={updateSkill}
                deleteSkillCallbackFunc={deleteSkill}
                skills={allSkills} //NOTE - Switch to get all skills by ID???
                kickOutCallbackFunc={kickOut}
                loggedUserTrades={loggedUserTrades}
                acceptDeclineTradeCallbackFunc={acceptDeclineTrade}
              />
            }
          />
          <Route
            path="/userprofile"
            element={
              <UserProfile
                selectedUser={selectedUser}
                getSpecificUserSkills={getSpecificUserSkills}
                storeRecipSkillCallbackFunc={storeRecipSkill}
                loggedUserTrades={loggedUserTrades}
                kickOutCallbackFunc={kickOut}
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
                storeRecipSkillCallbackFunc={storeRecipSkill}
                loggedUserTrades={loggedUserTrades}
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
          <Route
            path="/trade"
            element={
              <TradePage
                responseMsg={responseMsg}
                kickOutCallbackFunc={kickOut}
                getSpecificUserSkillsCallbackFunc={getSpecificUserSkills}
                selectedSkill={selectedSkill}
                addTradeCallbackFunc={addTrade}
                timeoutNav={timeoutNav}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
