import { Box } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar/SearchBar";
import LandingPage from "./LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<MainPage />} /> */}
        {/* <Route path="/" element={<ProfileSettings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
