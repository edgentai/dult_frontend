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
  const [textAreaValue, setTextAreaValue] = useState("");
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
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch("https://cy2ed1wj8b.execute-api.us-east-1.amazonaws.com")
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
            topic: data["Topic"][i],
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
    fetch("https://ozg4dhfzrk.execute-api.us-east-1.amazonaws.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: textAreaValue,
        user_id: selectedRowData.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      });
    setSelectedRowData(null);
  };

  const handleTextAreaInput = (e) => {
    setTextAreaValue(e.target.value);
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
                <h2>Complaint Info</h2>
                <p>
                  <span className="modal-tag">ID: </span>
                  {selectedRowData.id}
                </p>
                <p>
                  <span className="modal-tag">Date:</span> {selectedRowData.date}
                </p>
                <p>
                  <span className="modal-tag">Intent:</span> {selectedRowData.intent}
                </p>
                <p>
                  <span className="modal-tag">Sentiment:</span> {selectedRowData.sentiment}
                </p>
                <p>
                  <span className="modal-tag">Sub Class: </span>
                  {selectedRowData.subclass}
                </p>
                <p>
                  <span className="modal-tag">Super Class: </span>
                  {selectedRowData.superclass}
                </p>
                <p>
                  <span className="modal-tag">User Message:</span> {selectedRowData.usermessage}
                </p>
                <p>
                  <span className="modal-tag">Topic:</span> {selectedRowData.topic}
                </p>

                <textarea rows={4} placeholder="Enter your comment here..." className="comment-textarea" onChange={handleTextAreaInput} />

                <Button variant="contained" onClick={handleModalClose} className="submit-button">
                  Submit
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
