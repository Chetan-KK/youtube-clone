import "./Sidebar.css";
import React, { useContext, useEffect, useState } from "react";

import YouTubeLogo from "/YouTubeLogo.png";
import homeIcon from "/icons/home.svg";
import menuIcon from "/icons/menu.svg";
import subscriptionIcon from "/icons/subscription.svg";
import libraryIcon from "/icons/library.svg";
import shortsIcon from "/icons/shorts.svg";
import historyIcon from "/icons/history.svg";
import videosIcon from "/icons/videos.svg";
import moviesIcon from "/icons/movies.svg";
import clockIcon from "/icons/clock.svg";
import Opition from "./Option/Option";

import YouTubeLogoDark from "/YouTubeLogoDark.png";
import homeIconDark from "/icons/dark/home.svg";
import menuIconDark from "/icons/dark/menu.svg";
import subscriptionIconDark from "/icons/dark/subscription.svg";
import libraryIconDark from "/icons/dark/library.svg";
import shortsIconDark from "/icons/dark/shorts.svg";
import historyIconDark from "/icons/dark/history.svg";
import videosIconDark from "/icons/dark/videos.svg";
import moviesIconDark from "/icons/dark/movies.svg";
import clockIconDark from "/icons/dark/clock.svg";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

export default function Sidebar(props) {
  const { theme } = useContext(ThemeContext);

  const [slideMenuStatus, setSlideMenuStatus] = useState(false);

  useEffect(() => {
    setSlideMenuStatus(true);
  }, [props.openStatus]);

  useEffect(() => {
    setSlideMenuStatus(false);
  }, []);

  const handleMenuClose = () => {
    setSlideMenuStatus(false);
  };

  const OpenSideBar = () => (
    <div className="SidebarOpen">
      {props.isSlideMenu ? (
        <>
          <div
            className={
              slideMenuStatus ? "sideOverlay addOverlay" : "sideOverlay "
            }
          ></div>
          <div className="videoPlaying_sidebar-top flex">
            <img
              src={theme === "dark" ? menuIconDark : menuIcon}
              className="normal_icon normal_icon_menuIcon"
              alt=""
              onClick={handleMenuClose}
            />
            <NavLink to="/">
              <img
                className="header__mainLogo"
                src={theme === "dark" ? YouTubeLogoDark : YouTubeLogo}
                alt=""
              />
            </NavLink>
          </div>
        </>
      ) : undefined}
      <div className="sidebar__section">
        <Opition
          name="Home"
          icon={theme === "dark" ? homeIconDark : homeIcon}
        />
        <Opition
          name="Shorts"
          icon={theme === "dark" ? shortsIconDark : shortsIcon}
        />
        <Opition
          name="Subscription"
          icon={theme === "dark" ? subscriptionIconDark : subscriptionIcon}
        />
      </div>
      <div className="sidebar__section">
        <Opition
          name="Library"
          icon={theme === "dark" ? libraryIconDark : libraryIcon}
        />
        <Opition
          name="History"
          icon={theme === "dark" ? historyIconDark : historyIcon}
        />
        <Opition
          name="Your videos"
          icon={theme === "dark" ? videosIconDark : videosIcon}
        />
        <Opition
          name="Your movies"
          icon={theme === "dark" ? moviesIconDark : moviesIcon}
        />
        <Opition
          name="Watch Later"
          icon={theme === "dark" ? clockIconDark : clockIcon}
        />
      </div>
    </div>
  );

  return (
    <div
      className={
        props.isSlideMenu
          ? slideMenuStatus
            ? `Sidebar videoPlaying videoPlayingOpen`
            : `Sidebar videoPlaying`
          : `Sidebar `
      }
      // className={`Sidebar videoPlaying videoPlayingOpen`}
      style={
        props.isSlideMenu
          ? { width: "220px" }
          : props.openStatus
          ? { width: "200px" }
          : { width: "100px" }
      }
    >
      {props.isSlideMenu ? (
        <OpenSideBar />
      ) : props.openStatus ? (
        <OpenSideBar />
      ) : (
        <div className="SidebarClose">
          <Opition
            name="Home"
            icon={theme === "dark" ? homeIconDark : homeIcon}
          />
          <Opition
            name="Shorts"
            icon={theme === "dark" ? shortsIconDark : shortsIcon}
          />
          <Opition
            name="Subscription"
            icon={theme === "dark" ? subscriptionIconDark : subscriptionIcon}
          />
          <Opition
            name="Library"
            icon={theme === "dark" ? libraryIconDark : libraryIcon}
          />
        </div>
      )}
    </div>
  );
}
