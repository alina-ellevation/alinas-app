import React from "react";

function ConfigYAMLGenerator({
  district,
  pipeline,
  description,
  extractor,
  extractArgs,
  processingScript,
  mapping,
  scheduleDOW,
  scheduleTime,
  apply,
  defaultSelect,
  daysOfWeek,
  isValidScheduleTime,
}) {
  // Defined here since used twice: in validations list and yml formatting
  const isValidPipeline = pipeline != defaultSelect;
  const isValidExtractor = extractor != defaultSelect;

  // List of each validation + message to show if the validation hasn't passed
  const validations = [
    {
      isValid: district.startsWith("ESLREPS-"),
      errorMessage: "Please enter a district in valid format.",
    },
    { isValid: isValidPipeline, errorMessage: "Please select a pipeline." },
    {
      isValid: description !== "",
      errorMessage: "Please enter a description.",
    },
    { isValid: isValidExtractor, errorMessage: "Please select an extractor." },
    {
      isValid:
        mapping.startsWith("!include ") &&
        mapping !== "!include mappings/file.yml",
      errorMessage: "Please update the mapping path.",
    },
    {
      isValid: isValidScheduleTime,
      errorMessage: "Please enter a valid schedule_time.",
    },
  ];

  // Header shown above YAML depends on whether or not ALL validations have passed
  const allValid = validations.every((validation) => validation.isValid);
  const headerText = allValid
    ? "😺 Here's your config YAML!"
    : "😿 Meowzers, invalid config...";

  // Helper functions to convert days of week to numbers and set yml indentation
  const scheduleDOWNumbers = scheduleDOW
    .map((day) => daysOfWeek.indexOf(day) + 1)
    .sort((a, b) => a - b);
  const indent = (spaces) => " ".repeat(spaces);

  return (
    <div>
      <span className="HeaderSmall">{headerText}</span>
      <br />
      <pre>
        {`district: ${district}`}
        {`\npipeline: ${isValidPipeline ? pipeline : ""}`}
        {`\ndescription: ${description}`}
        {`\nextract:`}
        {`\n${indent(2)}extractor: ${isValidExtractor ? extractor : ""}`}
        {Object.entries(extractArgs).map(
          ([key, value]) => `\n${indent(4)}${key}: ${value}`
        )}
        {processingScript
          ? `\n${indent(0)}processing:` +
            `\n${indent(2)}processing_type: custom` +
            `\n${indent(2)}script: ${processingScript}`
          : ""}
        {`\nmapping: ${mapping}`}
        {`\nschedule:`}
        {`\n${indent(2)}dow: [${scheduleDOWNumbers.join(", ")}]`}
        {`\n${indent(2)}time: ${scheduleTime}`}
        {`\napply: ${apply}`}
      </pre>
      <br />
      {validations.map(
        (validation, index) =>
          !validation.isValid && (
            <p key={index} className="ErrorMessage">
              {validation.errorMessage}
            </p>
          )
      )}
    </div>
  );
}

export default ConfigYAMLGenerator;
