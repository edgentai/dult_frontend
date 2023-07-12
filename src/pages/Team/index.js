import "./styles.css";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
// import tableMockData from "../../mockData/tableData";

const Team = () => {
  const [tableData, setTableData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //console.log(tableMockData);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "intent",
      headerName: "Intent",
      // type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "sentiment",
      headerName: "Sentiment",
      flex: 1,
    },
    {
      field: "subclass",
      headerName: "Sub_Class",
      flex: 1,
    },
    {
      field: "superclass",
      headerName: "Super_Class",
      flex: 1,
    },
    {
      field: "usermessage",
      headerName: "User_Message",
      flex: 1,
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1
    }
  ];

  // useEffect(() => {
  //   fetch("http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/tweet-data/")
  //     .then((response) => response.json())
  //     .then((data) => setTableData(data));
  // }, []);
  useEffect(() => {
      fetch("http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/tweet-data/")
      .then((response) => response.json())
      .then((data) => {
        //setTableData(data)

        var tableRowData = [];
        var intialLength = data["Date"].length; 
        for(var i = 0; i < intialLength; i++) {
          var obj = {
            id: data["id"][i],
            date: data["Date"][i],
            intent: data["Intent"][i],
            sentiment: data["Sentiment"][i],
            subclass: data["Sub_Class"][i],
            superclass: data["Super_Class"][i],
            usermessage: data["user_message"][i],
            assignee: ""
          }
          tableRowData.push(obj)
        }
        setTableData(tableRowData);
      });
    
   // setTableData([{id: 1, date: "12-2-2012", intent: "intent", sentiment: "sentiment", subclass: "subclass", superclass: "superclass", usermessage: "User_Message"}])
  }, []);

  return (
    
    <div className="page-container">
      <SideBar currentPage={"team"}></SideBar>
      <div className="content-container">
        <Box m="20px" className="team-container">
          <Header className="team-header" title="Grievance Messages" subtitle="View Today's Important Messages" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid className="team-table" checkboxSelection rows={tableData} columns={columns} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Team;
