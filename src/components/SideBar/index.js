import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function SideBar() {
  return (
    <div className="page-side-bar">
      <div className="logo-wrapper">
        <img src="../../assets/thumb.png" alt="logo" />
      </div>
      <div className="navigation-menu">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <Link to="/">Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
