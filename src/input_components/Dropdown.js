import "../App.css";
import ConfigItemLabel from "./ConfigItemLabel";

function Dropdown({ label, items, value, handleChange }) {
  return (
    <div className="ComponentsContainer">
      <ConfigItemLabel label={label} />
      <div className="InputContainer">
        <select
          id={label}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        >
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
