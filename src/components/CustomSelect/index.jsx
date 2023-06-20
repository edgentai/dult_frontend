import React from 'react';
import "./style.css";

const CustomSelect = ({ options, value, onChange, disabled, className }) => {
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
