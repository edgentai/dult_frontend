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
import cardMockData from "../../mockData/cardData";

import { Box, Modal, Button } from "@mui/material";

import moment from "moment";

const Home = () => {
  const [startDateValueStackBarChart, setStartDateValueStackBarChart] = useState([moment().subtract(7, "days").calendar(), new Date()]);
  const [startDateValue, startDateOnChange] = useState([moment().subtract(7, "days").calendar(), new Date()]);
  const [daysSelectedValue, setDaysSelectedValue] = useState("daily");
  const [startDateValueCardData, setStartDateValueCardData] = useState([moment().subtract(7, "days").calendar(), new Date()]);
  const [cardData, setCardData] = useState({});

  const initialArray = new Array(30).fill(null);
  const [topicData, setTopicData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    fetch("https://q8n569c2w6.execute-api.us-east-1.amazonaws.com/")
      .then((response) => response.json())
      .then((data) => setCardData(data));
    //setCardData(cardMockData);

    fetch("https://dskzshj792.execute-api.us-east-1.amazonaws.com")
      .then((res) => res.json())
      .then((data) => setTopicData(data));
  }, []);

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

  const handleRowClick = (ele) => {
    setSelectedRowData(ele);
  };

  const handleModalClose = () => {
    setSelectedRowData(null);
  };

  return (
    <div className="page-container">
      <SideBar activePage="home"></SideBar>
      <div className="page-content-container">
        <div className="all-complains-container">
          {cardData && cardData.sentiment ? (
            <div className="title complains-suggestions-section">
              <div className="complains-suggestions">
                <p className="com-text">Total Tweets</p>
                <p className="com-per">{cardData.tweet_count_card}</p>
              </div>

              <div className="complains-suggestions green">
                <p className="com-text">Positive Sentiment</p>
                <p className="com-per">{cardData.sentiment.Positive}</p>
              </div>
              <div className="complains-suggestions red">
                <p className="com-text">Negative Sentiment</p>
                <p className="com-per">{cardData.sentiment.Negative}</p>
              </div>
              <div className="complains-suggestions red">
                <p className="com-text">Urgent</p>
                <p className="com-per">{cardData.intent.urgent_actionable}</p>
              </div>
              <div className="complains-suggestions yello">
                <p className="com-text">Appeal</p>
                <p className="com-per">{cardData.intent.appeal}</p>
              </div>

              {/* <div className="card-date-picker-wrapper">
                <span className="filter-by-date">Filter by Date</span>
                <DateRangePicker value={startDateValueCardData} onChange={setStartDateValueCardData} yearPlaceholder="YYYY" dayPlaceholder="DD" monthPlaceholder="MM"></DateRangePicker>
              </div> */}
            </div>
          ) : null}
        </div>
        <div className="home-content-container">
          <div className="home-page-charts-section">
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
              <LineChart filterByDayBasic={daysSelectedValue} dateDetails={startDateValueStackBarChart}></LineChart>
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
              <StackBarChart dateDetails={startDateValue} />
            </div>
          </div>
          <div className="tweets-topic-container">
            <div className="tweets-topics-wrapper">
              <div className="tweets-heading">
                <h3>Top Topics of this Week</h3>
              </div>
              <div className="all-tweets-btn">
                {topicData.length > 0 &&
                  topicData.map((ele, i) => {
                    if (ele.topic) {
                      return (
                        <button className="tweets-btn" key={i} onClick={() => handleRowClick(ele)}>
                          <span>{ele.topic}</span>
                        </button>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>

        <Modal open={!!selectedRowData} onClose={handleModalClose}>
          <Box className="modal">
            {selectedRowData && (
              <>
                <h2>Topic Message</h2>
                <p>User Message: {selectedRowData.items}</p>
                <Button variant="contained" onClick={handleModalClose} className="submit-button">
                  Close
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
