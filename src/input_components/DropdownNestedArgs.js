import "../App.css";
import React from "react";
import Dropdown from "./Dropdown";

function DropdownNestedArgs({
  label,
  itemsWithArgs,
  selectedItem,
  handleChangeSelectedItem,
  args,
  setArgs,
}) {
  /* Whenever the dropdown selection changes, clear out any args that don't apply to the new selection
    but keep any that do (e.g. retain tenant_id when switching between Clever extractors) */
  React.useEffect(() => {
    const relevantArgs = Object.entries(args)
      .filter(([key]) =>
        itemsWithArgs[selectedItem]?.some(
          (component) => component.props.label === key
        )
      )
      .reduce(
        (filteredArgs, [key, value]) => ({ ...filteredArgs, [key]: value }),
        {}
      );

    setArgs(relevantArgs);
  }, [itemsWithArgs, selectedItem, args, setArgs]);

  /* TODO BUG: this should incorporate handleChange from component props,
  otherwise overwriting the handleChange upon component cloning
  will disregard any value modifications and just pass the direct value */
  const handleChangeArgs = (arg) => (value) => {
    setArgs({ ...args, [arg]: value });
  };

  return (
    <div>
      <Dropdown
        label={label}
        items={Object.keys(itemsWithArgs)}
        value={selectedItem}
        handleChange={handleChangeSelectedItem}
      />
      {itemsWithArgs[selectedItem] && // Unfurl args for the selected dropdown item
        itemsWithArgs[selectedItem].map((component, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(component, {
              /* TODO BUG: args dict isn't populated with default value,
              a change to it is needed for the key/value pair to appear */
              value:
                args[component.props.label] || component.props.default || "",
              handleChange: handleChangeArgs(component.props.label),
            })}
          </React.Fragment>
        ))}
    </div>
  );
}

export default DropdownNestedArgs;
