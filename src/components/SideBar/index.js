import "./styles.css";
import React from "react";
export default function App(props) {
  return (
    <div className="page-side-bar">
      <div className="logo-wrapper">Company logo</div>
      <div className="navigation-menu">
        <ul>
          <li>
            <a href="/" className={props.currentPage == "home" ? "active": ""}>
              Home
            </a>
          </li>
          <li>
            <a href="/team" className={props.currentPage == "team" ? "active": ""}>Table</a>
          </li>
          <li>
            <a href="">Reports</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
