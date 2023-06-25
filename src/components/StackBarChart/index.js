import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";



const colors = ["#F6828C", "#F6E382", "#9182F6", "#F682EA", "#064A94", "#007AFF"];

const StackedBarChart = () => {
  const [barChatData, setBarChatData] = useState([]);
  // const data = [
  //   { name: "Ticketing Issue", value1: 1000, value2: 600, value3: 900, value4: 800, value5: 500, value6: 300 },
  //   { name: "Crew behaviour", value1: 140, value3: 500 },
  //   { name: "Vehicle related", value2: 800, value1: 600 },
  //   { name: "Route", value4: 600 },
  //   { name: "Pass/reserved seat", value5: 700 },
  //   { name: "Facility related", value2: 700 },
  //   { name: "App/website related", value1: 500 },
  //   { name: "Others", value6: 300 },
  // ];
  useEffect(() => {
    fetch("http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/bar-graph/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "start_date": "2023-01-01",
        "end_date": "2023-07-01"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setBarChatData(data);
        var realData = [];
        for (var key in data) {
            var value = data[key];
            var obj = {
              name: key
            }
            var j = 1;
            for (var key1 in data[key]) {
              if(typeof obj["value"+j] == "undefined") {
                  obj["value"+j] = Object.values(data[key][key1])[0];
                  j++;
              } 
            } 
            realData.push(obj);
        }
        setBarChatData(realData);
      });
  }, []);

  return (
    <BarChart width={800} height={400} data={barChatData} layout="vertical" barCategoryGap={5}>
      <XAxis type="number" orientation="top" />
      <YAxis width={100} type="category" dataKey="name" margin={{ left: 40 }} />
      <Tooltip />
      <Bar dataKey="value1" stackId="a" fill={colors[0]} />
      <Bar dataKey="value2" stackId="a" fill={colors[1]} />
      <Bar dataKey="value3" stackId="a" fill={colors[2]} />
      <Bar dataKey="value4" stackId="a" fill={colors[3]} />
      <Bar dataKey="value5" stackId="a" fill={colors[4]} />
      <Bar dataKey="value6" stackId="a" fill={colors[5]} />
    </BarChart>
  );
};

export default StackedBarChart;
