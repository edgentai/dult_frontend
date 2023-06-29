import React from 'react';
import "./style.css";

const CustomSelect = ({ options, value, onChange, disabled, className }) => {
  // const handlerOnChange = ()=> {
  //   if(typeof onChange == "function") {
  //     onChange(value);
  //   }
  // }
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={className}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
