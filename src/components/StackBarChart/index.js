import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";
import moment from 'moment';


const StackedBarChart = (props) => {
   const [barChatData, setBarChatData] = useState([]);
   const [noResultsFound, setNoResultsFound] = useState(false);
   const [keyMapping, setKeyMapping] = useState([]);
   const [colorCodes, setColorCodes] = useState([]);
//   const barChatData = [{
//     "name": "Route",
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
//   }];


  // console.log(uniqueLabels);
  useEffect(() => {
    const colorCodes = [];
    function generateRandomColorCode() {
      // Generate random RGB values
      var red = Math.floor(Math.random() * 256);
      var green = Math.floor(Math.random() * 256);
      var blue = Math.floor(Math.random() * 256);

      // Convert RGB to hexadecimal
      var colorCode = '#' + red.toString(16) + green.toString(16) + blue.toString(16);

      return colorCode;
    }

    // Generate 60 random unique color codes
    for (var i = 0; i < 60; i++) {
      var randomColor = generateRandomColorCode();
      // Check if the color code is already generated
      if (!colorCodes.includes(randomColor)) {
        colorCodes.push(randomColor);
      }
    }
    setColorCodes(colorCodes);

    const startDate = moment(props.dateDetails[0]).format("YYYY-MM-DD");
    const endDate = moment(props.dateDetails[1]).format("YYYY-MM-DD");
    let mappingObject = []
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
        let mappingObjectForBar = [];
        for (var key in data) {
            var value = data[key];
            var obj = {
              name: key
            }
            for (const key1 in data[key]) {
              var label = Object.keys(data[key][key1])[0].toLowerCase();
              // label = label.replaceAll(" ", "");
              if(typeof obj[label] == "undefined" && label.length ) {
                //mappingObject.push({name: label, colorCode: colors[Math.floor(Math.random() * 10)]})
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

        var uniqueLabels = [];
        for(var i = 0; i < realData.length; i++) {
          let uniqueKeys = Object.keys(realData[i]); 
          uniqueLabels = uniqueLabels.concat(uniqueKeys);
        }
        
        uniqueLabels = [...new Set(uniqueLabels)];
        mappingObjectForBar = uniqueLabels.filter((item)=> {
          return item != "name";
        });
        console.log(uniqueLabels);

        var newObjectDetails = [];
        for(var object in realData) {
          var obj1 = {};
          for(var p = 0; p < uniqueLabels.length; p++) {
            if (typeof obj1[uniqueLabels[p]] == "undefined") {
              obj1[uniqueLabels[p]] = realData[object][uniqueLabels[p]] ? realData[object][uniqueLabels[p]] : null;
            } else {
              obj1[uniqueLabels[p]] = null;
            }
          }
          newObjectDetails.push(obj1);
        }
        setBarChatData(newObjectDetails);
        setKeyMapping(mappingObjectForBar);
      });
  }, [props.dateDetails]);

  return (
    <>
    {
      noResultsFound ? 
        <div className="no-results-found">No Results Found for your search</div> 
      :
      <>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart width={'100%'} height={'100%'} data={barChatData} layout="vertical" barCategoryGap={5}>
          <XAxis type="number" orientation="top" />
          <YAxis width={150} type="category" dataKey="name" margin={{ left: 40 }} />
          <Tooltip />
          {/* <Bar dataKey="value1" stackId="a" fill={colors[0]} />
          <Bar dataKey="value2" stackId="a" fill={colors[1]} />
          <Bar dataKey="value3" stackId="a" fill={colors[2]} />
          <Bar dataKey="value4" stackId="a" fill={colors[3]} />
          <Bar dataKey="value5" stackId="a" fill={colors[4]} />
          <Bar dataKey="value6" stackId="a" fill={colors[5]} /> */}
          {keyMapping.map((item, index) => 
            <Bar key={item} dataKey={item} stackId="a" fill={colorCodes[index]} />
          )}
        </BarChart>
      </ResponsiveContainer>
      </>
    }
    </>
  );
};

export default StackedBarChart;
