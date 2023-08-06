import "./styles.css";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";

const Team = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch("http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/tweet-data/")
      .then((response) => response.json())
      .then((data) => {
        var tableRowData = [];
        var intialLength = data["Date"].length;
        for (var i = 0; i < intialLength; i++) {
          var obj = {
            id: data["id"][i],
            date: data["Date"][i],
            intent: data["Intent"][i],
            sentiment: data["Sentiment"][i],
            subclass: data["Sub_Class"][i],
            superclass: data["Super_Class"][i],
            usermessage: data["user_message"][i],
            assignee: "",
          };
          tableRowData.push(obj);
        }
        setTableData(tableRowData);
      });
    // setTableData([{ id: 1, date: "12-2-2012", intent: "intent", sentiment: "sentiment", subclass: "subclass", superclass: "superclass", usermessage: "User_Message" }]);
  }, []);

  const handleRowClick = (params) => {
    setSelectedRowData(params.row);
  };

  const handleModalClose = () => {
    setSelectedRowData(null);
  };

  return (
    <div className="page-container">
      <SideBar activePage="team"></SideBar>
      <div className="page-content-container">
        <Box m="20px" className="team-container">
          <Header className="team-header" title="Grievance Messages" subtitle="" />
          <Box
            m="0 0 0 0"
            height="80vh"
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
                backgroundColor: "#09B2C6",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#09B2C6",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid className="team-table" rows={tableData} columns={columns} onRowClick={handleRowClick} />
          </Box>
        </Box>
        <Modal open={!!selectedRowData} onClose={handleModalClose}>
          <Box className="modal">
            {selectedRowData && (
              <>
                <h2>Selected Data</h2>
                <p>ID: {selectedRowData.id}</p>
                <p>Date: {selectedRowData.date}</p>
                <p>Intent: {selectedRowData.intent}</p>
                <p>Sentiment: {selectedRowData.sentiment}</p>
                <p>Sub Class: {selectedRowData.subclass}</p>
                <p>Super Class: {selectedRowData.superclass}</p>
                <p>User Message: {selectedRowData.usermessage}</p>

                <textarea rows={4} placeholder="Enter your comment here..." className="comment-textarea" />

                <Button variant="contained" onClick={handleModalClose} className="submit-button">
                  Submit
                </Button>
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

export default Team;
