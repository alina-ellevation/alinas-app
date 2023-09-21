import React from "react";

function ConfigYAMLGenerator({ jobConfiguration, defaultSelect, daysOfWeek }) {
  // Defined here since used twice: in validations list and yml formatting
  const isValidPipeline = jobConfiguration.pipeline != defaultSelect;
  const isValidExtractor = jobConfiguration.extractor != defaultSelect;

  // List of each validation + message to show if the validation hasn't passed
  const validations = [
    {
      isValid: jobConfiguration.district.startsWith("ESLREPS-"),
      errorMessage: "Please enter a district in valid format.",
    },
    { isValid: isValidPipeline, errorMessage: "Please select a pipeline." },
    {
      isValid: jobConfiguration.description !== "",
      errorMessage: "Please enter a description.",
    },
    { isValid: isValidExtractor, errorMessage: "Please select an extractor." },
    {
      isValid:
        jobConfiguration.mapping.startsWith("!include ") &&
        jobConfiguration.mapping !== "!include mappings/file.yml",
      errorMessage: "Please update the mapping path.",
    },
    {
      isValid: jobConfiguration.is_valid_schedule_time,
      errorMessage: "Please enter a valid schedule_time.",
    },
  ];

  // Header shown above YAML depends on whether or not ALL validations have passed
  const allValid = validations.every((validation) => validation.isValid);
  const headerText = allValid
    ? "😺 Here's your config YAML!"
    : "😿 Meowzers, invalid config...";

  // Helper functions to convert days of week to numbers and set yml indentation
  const scheduleDOWNumbers = jobConfiguration.schedule_dow
    .map((day) => daysOfWeek.indexOf(day) + 1)
    .sort((a, b) => a - b);
  const indent = (spaces) => " ".repeat(spaces);

  return (
    <div>
      <span className="HeaderSmall">{headerText}</span>
      <br />
      <pre>
        {`district: ${jobConfiguration.district}`}
        {`\npipeline: ${isValidPipeline ? jobConfiguration.pipeline : ""}`}
        {`\ndescription: ${jobConfiguration.description}`}
        {`\nextract:`}
        {`\n${indent(2)}extractor: ${
          isValidExtractor ? jobConfiguration.extractor : ""
        }`}
        {Object.entries(jobConfiguration.extract_args).map(
          ([key, value]) => `\n${indent(2)}${key}: ${value}`
        )}
        {jobConfiguration.processing_script
          ? `\n${indent(0)}processing:` +
            `\n${indent(2)}processing_type: custom` +
            `\n${indent(2)}script: ${jobConfiguration.processing_script}`
          : ""}
        {`\nmapping: ${jobConfiguration.mapping}`}
        {`\nschedule:`}
        {`\n${indent(2)}dow: [${scheduleDOWNumbers.join(", ")}]`}
        {`\n${indent(2)}time: ${jobConfiguration.schedule_time}`}
        {`\napply: ${jobConfiguration.apply}`}
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
