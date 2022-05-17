import LandingPage from "./LandingPage/LandingPage";
import MainPage from "./MainPage/MainPage";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Login/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
