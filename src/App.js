import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import UserProfile from "./components/user_components/UserProfile";
import SearchBar from "./components/SearchBar";

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
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("JWT encoded token: " + response.credential); //delete me
    let userObject = jwt_decode(response.credential);
    console.log(userObject); //delete me
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  // Search Bar

  // Search for User by user_name

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
      <SearchBar></SearchBar>
      {/* user profile will load to new page */}
      <UserProfile profile={user}></UserProfile>
    </div>
  );
}

export default App;
