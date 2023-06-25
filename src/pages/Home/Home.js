import "./styles.css";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import LineChart from "../../components/LineChart";
import StackBarChart from "../../components/StackBarChart";
import "react-date-picker/dist/DatePicker.css";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import CustomSelect from "../../components/CustomSelect";

const Home = () => {
  const [startDateValue, startDateOnChange] = useState(["", ""]);
  const [startDateValueStackBarChart, setStartDateValueStackBarChart] = useState(["", ""]);
  const [daysSelectedValue, setDaysSelectedValue] = useState("daily");
  const [cardData, setCardData] = useState("");

  // useEffect(() => {
  //   fetch("http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/card-data/")
  //     .then((response) => response.json())
  //     .then((data) => setCardData(data));
  // }, []);

  const daysOptions = [
    {
      label: "daily",
      value: "daily",
    },
    {
      label: "weekly",
      value: "weekly",
    },
    {
      label: "monthly",
      value: "monthly",
    },
  ];

  const handleSelectChange = (event) => {
    setDaysSelectedValue(event.target.value);
  };

  console.log("setStartDateValueStackBarChart", startDateValueStackBarChart);

  return (
    <div className="page-container">
      <SideBar></SideBar>
      <div className="content-container">
        <div className="all-complains-container">
          <div className="title complains-suggestions-section">
            <div className="complains-suggestions">
              <p className="com-text">Total Tweets</p>
              <p className="com-per">547</p>
            </div>

            <div className="complains-suggestions">
              <p className="com-text">Positive Sentiment</p>
              <p className="com-per">18</p>
            </div>
            <div className="complains-suggestions">
              <p className="com-text">Negative Sentiment</p>
              <p className="com-per">12</p>
            </div>
            <div className="complains-suggestions">
              <p className="com-text">Urgent</p>
              <p className="com-per">10</p>
            </div>
            <div className="complains-suggestions">
              <p className="com-text">Appeal</p>
              <p className="com-per">14</p>
            </div>
          </div>
        </div>
        <div className="line-chart">
          <div className="stack-bar-chart-header flex-end">
            <div className="stack-bar-filter">
              <label htmlFor="bar-chart-dropdown">View Tweets</label>
              <CustomSelect options={daysOptions} value={daysSelectedValue} onChange={handleSelectChange} disabled={false} className="days-custom-select"></CustomSelect>
            </div>
            <div className="date-picker-wrapper">
              <span className="filter-by-date">Filter by Date</span>
              <DateRangePicker value={startDateValueStackBarChart} onChange={setStartDateValueStackBarChart} yearPlaceholder="YYYY" dayPlaceholder="DD" monthPlaceholder="MM"></DateRangePicker>
            </div>
          </div>
          <LineChart></LineChart>
        </div>
        <div className="stack-bar-chart">
          <div className="stack-bar-chart-header flex-end">
            <div className="title">
              <p>Complaint Categories</p>
            </div>

            <div className="date-picker-wrapper">
              <span className="filter-by-date">Filter by Date</span>
              <DateRangePicker value={startDateValue} onChange={startDateOnChange} yearPlaceholder="YYYY" dayPlaceholder="DD" monthPlaceholder="MM"></DateRangePicker>
            </div>
          </div>
          <StackBarChart />
        </div>
      </div>
      <div className="tweets-topic-container">
        <div className="tweets-heading">
          <h3>Top Topics of this Week</h3>
        </div>
        <div className="all-tweets-btn">
          <button className="tweets-btn">
            <span>Positive</span>
          </button>
          <button className="tweets-btn">
            <span>Honest</span>
          </button>
          <button className="tweets-btn">
            <span>Friendly Staff</span>
          </button>
          <button className="tweets-btn">
            <span>Good Service</span>
          </button>
          <button className="tweets-btn">
            <span>Best support team</span>
          </button>
          <button className="tweets-btn">
            <span>Bus arrived on time</span>
          </button>
          <button className="tweets-btn">
            <span>Appreciate the driver</span>
          </button>
          <button className="tweets-btn light-brown">
            <span>Neutral</span>
          </button>
          <button className="tweets-btn light-pink">
            <span>Didn't get change</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
