import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Appeal/Complaint/Request is series 1
// Urgent Actionable - series 2 
// if anyone is empty make it 0 

export default function App() {
  const [lineChatDate, setLineChatData] = useState([]);
  const series = [
    {
      name: "Issue 1",
      data: [
        { category: "01/04", value: 0 },
        { category: "02/04", value: 4 },
        { category: "03/04", value: 2 },
        { category: "04/04", value: 4 },
        { category: "05/04", value: 3 },
        { category: "06/04", value: 4 },
        { category: "07/04", value: 2 },
        { category: "08/04", value: 3 },
        { category: "09/04", value: 4 },
        { category: "10/04", value: 8 },
        { category: "11/04", value: 7 },
        { category: "12/04", value: 6 },
        { category: "13/04", value: 5 },
        { category: "14/04", value: 8 },
        { category: "15/04", value: 4 },
        { category: "16/04", value: 4 },
        { category: "17/04", value: 3 },
        { category: "18/04", value: 7 },
        { category: "19/04", value: 8 },
        { category: "20/04", value: 4 }
      ],
      color: "green"
    },{
      name: "Issue 2",
      data: [
        { category: "01/04", value: 0 },
        { category: "02/04", value: 5 },
        { category: "03/04", value: 1 },
        { category: "04/04", value: 6 },
        { category: "05/04", value: 1 },
        { category: "06/04", value: 6 },
        { category: "07/04", value: 3 },
        { category: "08/04", value: 5 },
        { category: "09/04", value: 9 },
        { category: "10/04", value: 3 },
        { category: "11/04", value: 7 },
        { category: "12/04", value: 9 },
        { category: "13/04", value: 1 },
        { category: "14/04", value: 8 },
        { category: "15/04", value: 3 },
        { category: "16/04", value: 7 },
        { category: "17/04", value: 2 },
        { category: "18/04", value: 4 },
        { category: "19/04", value: 3 },
        { category: "20/04", value: 7 }
      ],
      color: "blue"
    }
  ];
  const [resData, setResData] = useState([]);

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "start_date": "2023-01-01",
          "end_date": "2023-07-01",
          "group_range": "daily"
      })
    };
    fetch('http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/line-chart/', requestOptions)
        .then(response => response.json())
        .then(data => {
         //console.log(data);
         var lineChartDataObj = []
         var issueType1 = {
            name: "appeal",
            data: [],
            color: "green"
          };
          var issueType2 = {
            name: "urgent_actionable",
            data: [],
            color: "blue"
          };
          for(var key in data) {
            if(data[key].length) {
              //console.log(key) // 2023-01-15
              //console.log(data[key]); //(2) [{…}, {…}]
              var obj = {};

              for(var j = 0; j < data[key].length; j++) {
                if(data[key][j] && data[key][j].hasOwnProperty("appeal")) {
                  obj.appeal = data[key][j]["appeal"];
                }
                if(data[key][j] && data[key][j].hasOwnProperty("urgent_actionable")) {
                  obj.urgent_actionable = data[key][j]["urgent_actionable"];
                }
              }
              if(obj.hasOwnProperty("appeal")) {
                issueType1.data.push({category: key, value: obj.appeal});
              } else {
                issueType1.data.push({category: key, value: 0});
              }
              if(obj.hasOwnProperty("urgent_actionable")) {
                issueType2.data.push({category: key, value: obj.urgent_actionable});
              } else {
                issueType2.data.push({category: key, value: 0});
              }
            }
          }
          lineChartDataObj.push(issueType1);
          lineChartDataObj.push(issueType2);
          setLineChatData(lineChartDataObj);
        });
}, []);

  return (
    <LineChart width={800} height={300}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis
        dataKey="category"
        type="category"
        allowDuplicatedCategory={false}
      />
      <YAxis dataKey="value" orientation="right" />
      <Tooltip />
      <Legend />
      {lineChatDate.map((s) => (
        <Line dataKey="value" data={s.data} name={s.name} key={s.name} stroke={s.color}/>
      ))}
    </LineChart>
  );
}
