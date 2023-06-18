import "./styles.css";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/Sidebar";
import LineChart from "../../components/LineChart/LineChart";
import StackBarChart from "../../components/StackBarChart/StackBarChart";
import 'react-date-picker/dist/DatePicker.css';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import CustomSelect from "../../components/CustomSelect";

const Home = ({ isDashboard = false }) => {
  const [startDateValue, startDateOnChange] = useState(["", ""]);
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
                        <CustomSelect 
                            placeholder = {"Select days"}
                            options={[
                            {
                                label: "1 day",
                                value: "1"
                            },
                            {
                                label: "7 days",
                                value: "7"
                            },
                            {
                                label: "30 days",
                                value: "30"
                            }
                        ]}>

                        </CustomSelect>
                    </div>
                    <div>
                        <CustomSelect 
                            placeholder = {""}
                            options={[
                            {
                                label: "Sum",
                                value: "sum"
                            },
                            {
                                label: "Minimum",
                                value: "minimum"
                            },
                            {
                                label: "Maximum",
                                value: "maximum"
                            }
                        ]}>

                        </CustomSelect>
                    </div>
                    <div className="date-picker-wrapper">
                        <span className="filter-by-date">Filter by Date</span>
                        <DateRangePicker value={startDateValue} onChange={startDateOnChange} yearPlaceholder="YYYY" dayPlaceholder="DD" monthPlaceholder="MM"></DateRangePicker>
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
                        <CustomSelect 
                            placeholder = {"Select days"}
                            options={[
                            {
                                label: "1 day",
                                value: "1"
                            },
                            {
                                label: "7 days",
                                value: "7"
                            },
                            {
                                label: "30 days",
                                value: "30"
                            }
                        ]}>

                        </CustomSelect>
                    </div>
                    <div>
                        <CustomSelect 
                            placeholder = {""}
                            options={[
                            {
                                label: "Sum",
                                value: "sum"
                            },
                            {
                                label: "Minimum",
                                value: "minimum"
                            },
                            {
                                label: "Maximum",
                                value: "maximum"
                            }
                        ]}>

                        </CustomSelect>
                    </div>
                    <div className="date-picker-wrapper">
                        <span className="filter-by-date">Filter by Date</span>
                        <DateRangePicker value={startDateValue} onChange={startDateOnChange} yearPlaceholder="YYYY" dayPlaceholder="DD" monthPlaceholder="MM"></DateRangePicker>
                    </div>
                </div>
                <StackBarChart ></StackBarChart>
            </div>
        </div>
    </div>
  );
};

export default Home;

