import LandingPage from "./LandingPage/LandingPage";
import MainPage from "./MainPage/MainPage";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Login/SignUp";

import { useState } from "react";

function App() {
  const [cafes, setCafes] = useState([]);
  const [userToken, setUserToken] = useState([]);
  const [userID, setUserID] = useState();

  console.log(cafes);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/landing-page"
          element={
            <LandingPage
              cafes={cafes}
              onCafeChange={(cafes) => setCafes([...cafes])}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              userToken={userToken}
              onUserTokenChange={setUserToken}
              onUserIDChange={setUserID}
            />
          }
        />
        <Route path="/" element={<SignUp />} />
        <Route
          path="/main-page"
          element={
            <MainPage
              cafes={cafes}
              onCafeChange={(cafes) => setCafes([...cafes])}
              userToken={userToken}
              onUserTokenChange={setUserToken}
              userID={userID}
            />
          }
        />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
