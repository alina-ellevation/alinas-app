import "../App.css";
import React from "react";
import TextEntryField from "./TextEntryField";

function TimeInput({ label, value, handleChange }) {
  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    // Ensure that the time is in valid military format (00:00-23:59)
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    setIsValid(timeRegex.test(value));
  }, [value]);

  return (
    <>
      <TextEntryField label={label} value={value} handleChange={handleChange} />
      {!isValid && (
        <div className="ErrorMessage">
          <b>Valid format: Military Time - 00:00-23:59</b>
        </div>
      )}
    </>
  );
}

export default TimeInput;
