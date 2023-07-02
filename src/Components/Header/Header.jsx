import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import menuIcon from "/icons/menu.svg";
import backIcon from "/icons/back.svg";
import searchIcon from "/icons/search.svg";
import micIcon from "/icons/mic.svg";
import clearIcon from "/icons/clear.svg";
import videoPlusIcon from "/icons/video-plus.svg";
import notificationIcon from "/icons/notification.svg";
import YouTubeLogo from "/YouTubeLogo.png";

import menuIconDark from "/icons/dark/menu.svg";
import backIconDark from "/icons/dark/back.svg";
import searchIconDark from "/icons/dark/search.svg";
import micIconDark from "/icons/dark/mic.svg";
import clearIconDark from "/icons/dark/clear.svg";
import videoPlusIconDark from "/icons/dark/video-plus.svg";
import notificationIconDark from "/icons/dark/notification.svg";
import YouTubeLogoDark from "/YouTubeLogoDark.png";

import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
// import Signin from "../auth/Signin";

export default function Header(props) {
  const { theme } = useContext(ThemeContext);

  const [clearBut, setclearBut] = useState(false);
  const [search, setSearch] = useState("");

  const [bigSearchBar, setBigSearchBar] = useState(window.innerWidth > 800);
  const [smallSearchBarOpen, setSmallSearchBarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 800) {
        setBigSearchBar(false);
      } else {
        setBigSearchBar(true);
      }
    });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    e.target.value == "" ? setclearBut(false) : setclearBut(true);
  };
  function handleClear() {
    setSearch("");
    setclearBut(false);
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${e.target[0].value}`);
  };

  const handleSmallSearchOpen = () => {
    setSmallSearchBarOpen(true);
  };

  const handleSmallSearchClose = () => {
    setSmallSearchBarOpen(false);
  };

  return (
    <div className="flex Header">
      <div className="flex header__side header__left">
        <img
          src={theme === "dark" ? menuIconDark : menuIcon}
          className="normal_icon normal_icon_menuIcon"
          alt=""
          onClick={props.handleMenu}
        />
        <NavLink to="/">
          <img
            className="header__mainLogo"
            src={theme === "dark" ? YouTubeLogoDark : YouTubeLogo}
            alt=""
          />
        </NavLink>
      </div>
      {bigSearchBar ? (
        <form className="flex header__form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="header__searchBar"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
          />
          <img
            src={theme === "dark" ? searchIconDark : searchIcon}
            className="normal_icon header__searchInnerIcon"
            alt=""
          />
          {clearBut && (
            <img
              src={theme === "dark" ? clearIconDark : clearIcon}
              className="normal_icon header__clearIcon"
              onClick={handleClear}
              alt=""
            />
          )}
          <button type="submit" className="header__searchButton">
            <img
              src={theme === "dark" ? searchIconDark : searchIcon}
              alt=""
              className="header__searchIcon"
            />
          </button>
          <img
            src={theme === "dark" ? micIconDark : micIcon}
            className="normal_icon"
            alt=""
          />
        </form>
      ) : undefined}
      <div className="flex header__side header__right">
        {/* this search bar is for small screens */}
        {bigSearchBar ? undefined : (
          <>
            <img
              src={theme === "dark" ? searchIconDark : searchIcon}
              alt=""
              onClick={handleSmallSearchOpen}
              className="normal_icon"
            />
            {smallSearchBarOpen ? (
              <div className="SmallScreen_SearchBar flex">
                <img
                  src={theme === "dark" ? backIconDark : backIcon}
                  alt=""
                  onClick={handleSmallSearchClose}
                  className="normal_icon"
                />
                <form
                  className="flex header__form"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="text"
                    className="header__searchBar"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search"
                  />
                  <img
                    src={theme === "dark" ? searchIconDark : searchIcon}
                    className="normal_icon header__searchInnerIcon"
                    alt=""
                  />
                  {clearBut && (
                    <img
                      src={theme === "dark" ? clearIconDark : clearIcon}
                      className="normal_icon header__clearIcon"
                      onClick={handleClear}
                      alt=""
                    />
                  )}
                  <button type="submit" className="header__searchButton">
                    <img
                      src={theme === "dark" ? searchIconDark : searchIcon}
                      alt=""
                      className="header__searchIcon"
                    />
                  </button>
                  <img
                    src={theme === "dark" ? micIconDark : micIcon}
                    className="normal_icon"
                    alt=""
                  />
                </form>
              </div>
            ) : undefined}
          </>
        )}
        <img
          src={theme === "dark" ? videoPlusIconDark : videoPlusIcon}
          alt=""
          className="normal_icon"
        />
        <img
          src={theme === "dark" ? notificationIconDark : notificationIcon}
          alt=""
          className="normal_icon"
        />
        {/* <Signin /> */}
      </div>
    </div>
  );
}
