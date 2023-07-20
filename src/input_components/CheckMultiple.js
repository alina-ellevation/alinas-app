import "../App.css";
import React from "react";
import ConfigItemLabel from "./ConfigItemLabel";

function CheckMultiple({ label, items, value, setValue }) {
  const [selectAll, setSelectAll] = React.useState();

  const handleItemSelect = (item) => {
    // Check if the item is already selected and remove it, or add it if it's not selected
    setValue((prevSelection) =>
      prevSelection.includes(item)
        ? prevSelection.filter((i) => i !== item)
        : [...prevSelection, item]
    );
  };

  React.useEffect(() => {
    // If selectAll state changes (based on button click), check/uncheck all items accordingly
    if (selectAll !== undefined) {
      setValue(selectAll ? items : []);
      // set state back to undefined to allow subsequent checking/unchecking of individual items
      setSelectAll(undefined);
    }
  }, [selectAll, items, setValue]);

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
