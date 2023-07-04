import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";
import moment from 'moment';


const colors = ["#F6828C", "#F6E382", "#9182F6", "#F682EA", "#064A94", "#007AFF", "#F6828C", "#F6E382", "#9182F6", "#F682EA", "#064A94", "#007AFF"];


const StackedBarChart = (props) => {
   const [barChatData, setBarChatData] = useState([]);
   const [noResultsFound, setNoResultsFound] = useState(false);
   const [keyMapping, setKeyMapping] = useState([]);
//   const barChatData = [{
//     "name": "Route",
//     "value1": 11,
//     "value1label": "irregularoperation",
//     "irregularoperation": 11,
//     "routedeviation": 43,
//     "partialtrip": 16,
//     "others": 10,
//     "delaydeparture": 2,
//     "stoppingmorethanminsinbusstops": 1
// }, {
//     "name": "Vehicle Related Issue",
//     "others": 64,
//     "vehicledefect": 20,
//     "cleanlinessofvehicle": 40,
//     "digitalandmanualboardissue": 19,
//     "displayofadvertisement": 2,
//     "breakdown": 5,
//     "patheticseats": 3,
//     "emissionofsmoke": 1
// }, {
//     "name": "Others"
// }, {
//     "name": "PASS_OR_Reserved Seat Issue",
//     "gendermisspunch": 2,
//     "others": 3,
//     "seniorcitizenpassissue_or_seatissue_or_concessionticket": 2,
//     "wrongdate_or_day_or_monthinpassissued": 1
// }, {
//     "name": "Facility Issue",
//     "others": 52,
//     "kempegowdabusstationttmc": 7,
//     "koramangalattmc": 2,
//     "bannerghattattmc": 1,
//     "kengerittmc": 1,
//     "jayanagarttmc": 1,
//     "baggageloss": 1
// }, {
//     "name": "Crew Behaviors",
//     "womenissue": 6,
//     "others": 9,
//     "crewmisbehavior": 14,
//     "assault": 1,
//     "harassment": 1
// }, {
//     "name": "Ticket Related Issue",
//     "changedue": 3,
//     "checkingissue": 12,
//     "ticketprintingissue": 13,
//     "ticketnotissued": 4,
//     "others": 4,
//     "qrcodeissue": 3
// }, {
//     "name": "Website_OR_App Related Issue",
//     "mobileapprelated": 5,
//     "websiterelatedcomplaints": 2
// }];
  useEffect(() => {
    const startDate = moment(props.dateDetails[0]).format("YYYY-MM-DD");
    const endDate = moment(props.dateDetails[1]).format("YYYY-MM-DD");
    const mappingObject = []
    fetch("http://ec2-44-193-126-1.compute-1.amazonaws.com:8000/recommendation/dashboard-data/bar-graph/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "start_date": startDate,
        "end_date": endDate
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
            for (const key1 in data[key]) {
              var label = Object.keys(data[key][key1])[0].toLowerCase();
              label = label.replaceAll(" ", "");
              if(typeof obj[label] == "undefined" && label.length ) {
                mappingObject.push({name: label, colorCode: colors[Math.floor(Math.random() * 10)]})
                obj[label] = parseInt(Object.values(data[key][key1])[0]);
              } 
            } 
            realData.push(obj);
        }
        if(realData.length == 0) {
          setNoResultsFound(true)
        } else {
          setNoResultsFound(false)
        }
        console.log(realData);
        
        setBarChatData(realData);
        setKeyMapping(mappingObject);
      });
  }, [props.dateDetails]);

  return (
    <>
    {
      noResultsFound ? 
        <div className="no-results-found">No Results Found for your search</div> 
      :
      <>
      <BarChart width={800} height={400} data={barChatData} layout="vertical" barCategoryGap={5}>
        <XAxis type="number" orientation="top" />
        <YAxis width={100} type="category" dataKey="name" margin={{ left: 40 }} />
        <Tooltip />
        {/* <Bar dataKey="value1" stackId="a" fill={colors[0]} />
        <Bar dataKey="value2" stackId="a" fill={colors[1]} />
        <Bar dataKey="value3" stackId="a" fill={colors[2]} />
        <Bar dataKey="value4" stackId="a" fill={colors[3]} />
        <Bar dataKey="value5" stackId="a" fill={colors[4]} />
        <Bar dataKey="value6" stackId="a" fill={colors[5]} /> */}
        {keyMapping.map((item) => 
          <Bar  key={item} dataKey={item.name} stackId="a" fill={item.colorCode} />
        )}
      </BarChart>
      </>
    }
    </>
  );
};

export default StackedBarChart;
