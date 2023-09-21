import "../App.css";
import React from "react";
import ConfigItemLabel from "./ConfigItemLabel";

function CheckMultiple({ label, items, value, handleChange }) {
  const [selectAll, setSelectAll] = React.useState();

  const handleItemSelect = (item) => {
    // Check if the item is already selected and remove it, or add it if it's not selected
    handleChange((prev) => ({
      ...prev,
      [label]: prev[label].includes(item)
        ? prev[label].filter((i) => i !== item)
        : [...prev[label], item],
    }));
  };

  React.useEffect(() => {
    // If selectAll state changes (based on button click), check/uncheck all items accordingly
    if (selectAll !== undefined) {
      handleChange((prev) => ({
        ...prev,
        [label]: selectAll ? items : [],
      }));
      // set state back to undefined to allow subsequent checking/unchecking of individual items
      setSelectAll(undefined);
    }
  }, [selectAll, items, handleChange, label]);

  return (
    <div className="ComponentsContainer">
      <ConfigItemLabel label={label} />
      <div className="MultiSelectInput">
        {items.map((item) => (
          <label key={item}>
            <input
              className="CheckboxInput"
              type="checkbox"
              checked={value.includes(item)}
              onChange={() => handleItemSelect(item)}
            />
            {item}
          </label>
        ))}
      </div>
      <div className="ButtonContainer">
        <button onClick={() => setSelectAll(true)}>Select All</button>
        <button onClick={() => setSelectAll(false)}>Unselect All</button>
      </div>
    </div>
  );
}

export default CheckMultiple;
