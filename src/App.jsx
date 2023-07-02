import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import {
  Navigate,
  Route,
  Routes,
  redirect,
  useLocation,
} from "react-router-dom";
import HomeResultsPage from "./Components/HomeResultsPage/HomeResultsPage";
import SearchResults from "./Components/SearchResults/SearchResults";
import MainVideoPage from "./Components/MainVideoPage/MainVideoPage";
import { ThemeContext } from "./Context/ThemeContext";

function App() {
  const { theme, changeTheme } = useContext(ThemeContext);

  const [menuToggle, setMenuToggle] = useState(true);
  const [isSlideMenu, setIsSlideMenu] = useState(false);

  function handleMenu() {
    setMenuToggle(!menuToggle);
  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/video/")) {
      setIsSlideMenu(true);
    } else {
      window.innerWidth < 800 ? setIsSlideMenu(true) : setIsSlideMenu(false);
      window.addEventListener("resize", () => {
        window.innerWidth < 800 ? setIsSlideMenu(true) : setIsSlideMenu(false);
      });
    }
  }, [location]);

  return (
    <div className={`App ${theme == "dark" ? "dark__mode" : ""}`}>
      <Header handleMenu={handleMenu} />
      <section className="main__section">
        <Sidebar openStatus={menuToggle} isSlideMenu={isSlideMenu} />
        <Routes>
          <Route path="/" element={<Navigate to="/home/all" />} />
          <Route path="/home" element={<Navigate to="/home/all" />} />
          <Route path="/home/:id" element={<HomeResultsPage />} />
          <Route path="/video/:id" element={<MainVideoPage />} />
          <Route path="/search/:id" element={<SearchResults />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
