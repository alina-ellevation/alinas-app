import "../App.css";
import React from "react";
import ConfigItemLabel from "./ConfigItemLabel";

function Checkbox({ label, value, handleChange }) {
  return (
    <div className="ComponentsContainer">
      <ConfigItemLabel label={label} />
      <div>
        <input
          className="CheckboxInput"
          type="checkbox"
          checked={value}
          onChange={(event) => handleChange(event.target.checked)}
        />
      </div>
    </div>
  );
}

export default Checkbox;
