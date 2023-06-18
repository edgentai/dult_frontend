import "./index.css";
import React from "react";
function CustomSelect(props) {
  console.log(props);
  return (
   <div>
        <select name="" id="">
            {props.placeholder ? 
                <option value={""}>{props.placeholder}</option>
                : null
            }
            {props.options.map((item, index)=> {
                return <option key={index} value={item.value}>{item.label}</option>
            })}
        </select>
   </div>
  );
}
export default CustomSelect;