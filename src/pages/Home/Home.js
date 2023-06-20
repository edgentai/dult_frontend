import "./styles.css";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/Sidebar";
import LineChart from "../../components/LineChart/LineChart";
import StackBarChart from "../../components/StackBarChart/StackBarChart";
import SimpleBarChart from "../../components/SimpleBarChart/SimpleBarChart";
import "react-date-picker/dist/DatePicker.css";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import CustomSelect from "../../components/CustomSelect";

const Home = ({ isDashboard = false }) => {
  const [startDateValue, startDateOnChange] = useState(["", ""]);
  const [startDateValueStackBarChart, setStartDateValueStackBarChart] = useState(["", ""]);
  const [daysSelectedValue, setDaysSelectedValue] = useState("");
  const [daysSelectedValueBarChart, setDaysSelectedValueBarChart] = useState("");
  const [mathSelectedValue, setMathSelectedValue] = useState("");

  const mathOptions = [
    {
      label: "Sum",
      value: "sum",
    },
    {
      label: "Minimum",
      value: "minimum",
    },
    {
      label: "Maximum",
      value: "maximum",
    },
  ];

  const daysOptions = [
    {
      label: "1 day",
      value: "1",
    },
    {
      label: "7 days",
      value: "7",
    },
    {
      label: "30 days",
      value: "30",
    },
  ];

  const handleSelectChange = (event) => {
    setDaysSelectedValue(event.target.value);
  };

  const handleMathSelectChange = (event) => {
    setMathSelectedValue(event.target.value);
  };

  const handledaysSelectChangeBarChart = (event) => {
    setDaysSelectedValueBarChart(event.target.value);
  };

  return (
    <div className="page-container">
      <SideBar></SideBar>
      <div className="content-container">
        <div className="all-complains-container">
          <div className="title complains-suggestions-section">
            <div className="complains-suggestions">
              <p className="com-text">Complaints</p>
              <p className="com-per">18</p>
            </div>
            <div className="complains-suggestions">
              <p className="com-text">Suggestions</p>
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
            <div>
              <CustomSelect options={mathOptions} value={mathSelectedValue} onChange={handleMathSelectChange} disabled={false} className={"math-custom-select"}></CustomSelect>
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

            <div className="stack-bar-filter">
              <label htmlFor="bar-chart-dropdown">View Tweets</label>
              <CustomSelect options={daysOptions} value={daysSelectedValueBarChart} onChange={handledaysSelectChangeBarChart} disabled={false} className="days-custom-select-bar-chart"></CustomSelect>
            </div>

            <div className="date-picker-wrapper">
              <span className="filter-by-date">Filter by Date</span>
              <DateRangePicker value={startDateValue} onChange={startDateOnChange} yearPlaceholder="YYYY" dayPlaceholder="DD" monthPlaceholder="MM"></DateRangePicker>
            </div>
          </div>
          <StackBarChart />
        </div>

        <div className="simple-bar-chart">
          <SimpleBarChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
