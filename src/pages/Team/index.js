import React, { useState, useEffect } from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useRecoilValue } from "recoil";
import textState from "../../atom";

import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const api_data = useRecoilValue(textState);
  console.log("api_dataindex", api_data?.message?.tweet_data);

  const id = api_data?.message?.tweet_data?.id;
  const date = api_data?.message?.tweet_data?.Date;
  const intent = api_data?.message?.tweet_data?.Intent;
  const sentiment = api_data?.message?.tweet_data?.Sentiment;
  const sub_class = api_data?.message?.tweet_data?.Sub_Class;
  const super_class = api_data?.message?.tweet_data?.Super_Class;
  const user_message = api_data?.message?.tweet_data?.user_message;

  var req_data = [];
  for (let idx = 0; idx < id.length; idx += 1) {
    const req_dict = {};
    req_dict["id"] = id[idx];
    req_dict["date"] = date[idx];
    req_dict["intent"] = intent[idx];
    req_dict["sentiment"] = sentiment[idx];
    req_dict["subclass"] = sub_class[idx];
    req_dict["superclass"] = super_class[idx];
    req_dict["usermessage"] = user_message[idx];
    req_data.push(req_dict);
  }

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
  ];

  return (
    <Box m="20px">
      <Header title="Grievance Messages" subtitle="View Today's Important Messages" />
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
        <DataGrid checkboxSelection rows={req_data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
