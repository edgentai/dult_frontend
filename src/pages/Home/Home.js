import "./styles.css";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/Sidebar";
import LineChart from "../../components/LineChart/LineChart";
import StackBarChart from "../../components/StackBarChart/StackBarChart";

const Home = ({ isDashboard = false }) => {
  return (
    <div className="page-container">
        <SideBar></SideBar>
        <div className="content-container">
            <div className="line-chart">
                <div className="stack-bar-chart-header">
                    <div className="title complains-suggestions-section">
                        <div className="complains-suggestions">
                            <p className="com-text">Complaints</p>
                            <p className="com-per">18</p>
                        </div>
                        <div className="complains-suggestions">
                            <p className="com-text">Suggestions</p>
                            <p className="com-per">12</p>
                        </div>
                    </div>
                    <div className="stack-bar-filter">
                        <label htmlFor="bar-chart-dropdown">View Tweets</label>
                        <select name="" id="bar-chart-dropdown">
                            <option value="">Last 7 days</option>
                            <option value="">Last 10 days</option>
                        </select>
                    </div>
                </div>
                <LineChart></LineChart>
            </div>
            <div className="stack-bar-chart">
                <div className="stack-bar-chart-header">
                    <div className="title">
                        <p>Complaint Categories</p>
                    </div>
                    <div className="stack-bar-filter">
                        <label htmlFor="bar-chart-dropdown">View Tweets</label>
                        <select name="" id="bar-chart-dropdown">
                            <option value="">Last 7 days</option>
                            <option value="">Last 10 days</option>
                        </select>
                    </div>
                </div>
                <StackBarChart ></StackBarChart>
            </div>
        </div>
    </div>
  );
};

export default Home;

