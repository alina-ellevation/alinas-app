import "../App.css";
import ConfigItemLabel from "./ConfigItemLabel";

function TextEntryField({ label, value, handleChange, intOnly = false }) {
  const handleChangeWithParsing = (event) => {
    const newValue = intOnly
      ? parseInt(event.target.value)
      : event.target.value;
    handleChange(newValue);
  };

  return (
    <div className="ComponentsContainer">
      <ConfigItemLabel label={label} />
      <div className="InputContainer">
        <input
          type="text"
          id={label}
          value={value}
          onChange={handleChangeWithParsing}
        />
      </div>
    </div>
  );
}

export default TextEntryField;
