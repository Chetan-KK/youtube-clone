import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Option(prop) {
  return (
    <NavLink
      to={`/${prop.name}`}
      className={({ isActive }) =>
        isActive ? "Option flex active_sidebar_link" : "Option flex"
      }
    >
      <img src={prop.icon} alt="" className="icon" />
      <div>{prop.name}</div>
    </NavLink>
  );
}

export default Option;
