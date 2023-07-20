import "../App.css";

function ConfigItemLabel({ label }) {
  return (
    <div className="LabelContainer">
      <label htmlFor={label}>{label}:</label>
    </div>
  );
}

export default ConfigItemLabel;
