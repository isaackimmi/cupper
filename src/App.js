import LandingPage from "./LandingPage/LandingPage";
import MainPage from "./MainPage/MainPage";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Login/SignUp";

import { useState, useEffect } from "react";

function App() {
  const [cafes, setCafes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/landing-page"
          element={<LandingPage onCafeChange={(cafes) => setCafes([...cafes])} />}
        />
        <Route
          path="/login"
          element={<Login onUserChange={setUser} />}
        />
        <Route path="/" element={<SignUp />} />
        <Route
          path="/main-page"
          element={
            <MainPage
              cafes={cafes}
              onCafeChange={(cafes) => setCafes([...cafes])}
              user={user}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
