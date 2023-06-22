import "./styles.css";
import React from "react";
export default function App() {
  return (
   <div className="page-side-bar">
        <div className="logo-wrapper">Company logo</div>
        <div className="navigation-menu">
            <ul>
                <li><a href="" className="active">Home</a></li>
                <li><a href="">Real Time</a></li>
                <li><a href="">Reports</a></li>
            </ul>
        </div>
   </div>
  );
}
