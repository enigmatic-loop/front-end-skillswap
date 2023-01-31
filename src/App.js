import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import UserProfile from "./components/user_components/UserProfile";
import SearchBar from "./components/SearchBar";
import axios from "axios";

const USER_PROFILE_JSON = [
  {
    city: null,
    first_name: "very",
    id: 1,
    last_name: "cool",
    profile_description: null,
    user_name: "so_cool",
  },
  {
    city: "new york",
    first_name: "really not steve",
    id: 2,
    last_name: "guy",
    profile_description: "just some guy",
    user_name: "steve_guy",
  },
  {
    city: null,
    first_name: "bruce",
    id: 3,
    last_name: "wayne",
    profile_description: null,
    user_name: "not_batman",
  },
  {
    city: "gotham",
    first_name: "selina",
    id: 6,
    last_name: "kyle",
    profile_description: "def not catwoman",
    user_name: "not_catwoman",
  },
];

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

  const [userNames, setUserNames] = useState([]);
  const [user, setUser] = useState({});

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
          console.log(user);
          return user.user_name;
        });
        console.log(userNameResList);
        setUserNames(userNameResList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchAllUserNames, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(googleUser).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {googleUser && (
        <div>
          <img src={googleUser.picture}></img>
          <h3>{googleUser.name}</h3>
        </div>
      )}
      <SearchBar
        placeholder={"Enter a username..."}
        userNames={userNames}
        fetchOneUserByUserName={fetchOneUserByUserName}
      ></SearchBar>
      {/* user profile will load to new page */}
      {/* <UserProfile profile={googleUser}></UserProfile> */}
    </div>
  );
}

export default App;
