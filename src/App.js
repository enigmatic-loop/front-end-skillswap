import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import UserProfile from "./components/user_components/UserProfile";
import UserDashboard from "./components/user_components/UserDashboard";
import UpdateProfileForm from "./components/user_components/UpdateProfileForm";
import UserSignUpForm from "./components/user_components/UserSignUpForm";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ResponsePage from "./components/ResponsePage";

function App() {
  //google login stuff
  const [googleUser, setGoogleUser] = useState({});

  function handleGoogleCallbackResponse(response) {
    console.log("JWT encoded token: " + response.credential); //delete me
    let userObject = jwt_decode(response.credential);
    console.log(userObject); //delete me
    setGoogleUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setGoogleUser({});
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

  const [userNames, setUserNames] = useState([]); //stores user names for the purposes of searching by user name
  const [user, setUser] = useState({}); //stores user obj that is called for viewing user page
  const [responseMessage, setResponseMessage] = useState({}); //stores API response message

  const URL = "http://localhost:5000";

  //Call one user from User_ table
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
        // console.log(userNameResList);
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
        console.log("axios response: ", res);
      })
      .catch((error) => {
        console.log("axios .catch error: ", error);
      });
  };

  useEffect(fetchAllUserNames, []);

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<UserDashboard />} />
        <Route path="/userprofile/" element={<UserProfile />} />
        <Route
          path="/signup/"
          element={
            <UserSignUpForm
              googleUser={googleUser}
              addUserCallbackFunc={addUser}
              // getResponseMessageCallbackFunc={fetchResponseMessage}
            />
          }
        />
        <Route
          path="/res"
          element={<ResponsePage responseMessage={responseMessage} />}
        />
      </Routes>
      {/* user profile will load to new page */}
      {/* <UserProfile profile={googleUser}></UserProfile> */}
    </div>
  );
}

export default App;
