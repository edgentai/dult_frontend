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
import moment from "moment";

// Appeal/Complaint/Request is series 1
// Urgent Actionable - series 2 
// if anyone is empty make it 0 

const LineChartGraph = (props)=> {
  const [lineChatDate, setLineChatData] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

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
    console.log(props.dateDetails.length);
    if(props.dateDetails.length) {
      const startDate = moment(props.dateDetails[0]).format("YYYY-MM-DD");
      const endDate = moment(props.dateDetails[1]).format("YYYY-MM-DD");

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "start_date": startDate,
            "end_date": endDate,
            "group_range": props.filterByDayBasic
        })
      };
      console.log(props.filterByDayBasic);
      fetch('http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/line-chart/', requestOptions)
        .then(response => response.json())
        .then(data => {
          
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
          for (var key in data) {
            if (data[key].length) {
              //console.log(key) // 2023-01-15
              //console.log(data[key]); //(2) [{…}, {…}]
              var obj = {};

              for (var j = 0; j < data[key].length; j++) {
                if (data[key][j] && data[key][j].hasOwnProperty("appeal")) {
                  obj.appeal = data[key][j]["appeal"];
                }
                if (data[key][j] && data[key][j].hasOwnProperty("urgent_actionable")) {
                  obj.urgent_actionable = data[key][j]["urgent_actionable"];
                }
              }
              if (obj.hasOwnProperty("appeal")) {
                issueType1.data.push({
                  category: key,
                  value: obj.appeal
                });
              } else {
                issueType1.data.push({
                  category: key,
                  value: 0
                });
              }
              if (obj.hasOwnProperty("urgent_actionable")) {
                issueType2.data.push({
                  category: key,
                  value: obj.urgent_actionable
                });
              } else {
                issueType2.data.push({
                  category: key,
                  value: 0
                });
              }
            }
          }
          lineChartDataObj.push(issueType1);
          lineChartDataObj.push(issueType2);
          setLineChatData(lineChartDataObj);
          if(lineChartDataObj[0].data.length == 0 && lineChartDataObj[1].data.length == 0) {
            setNoResultsFound(true);
          } else {
            setNoResultsFound(false);
          }
        });
    }
    
  }, [props.dateDetails, props.filterByDayBasic]);
  

  return (
    <>
      {noResultsFound ? 
        <div className="no-results-found">No Results Found for your search</div>
      : 
      <LineChart width={800} height={300}>
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
      }
    </>
  );
}
export default LineChartGraph;
