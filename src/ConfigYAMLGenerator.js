import React from "react";

function ConfigYAMLGenerator({
  district,
  pipeline,
  description,
  extractor,
  extractArgs,
  processingScript,
  mapping,
  scheduleDOW, // TODO: convert from labels to numbers
  scheduleTime,
  apply,
  daysOfWeek,
  defaultSelect,
}) {
  const scheduleDOWNumbers = scheduleDOW
    .map((day) => daysOfWeek.indexOf(day) + 1)
    .sort((a, b) => a - b);

  const showPipelineError = pipeline === defaultSelect;
  const showExtractorError = extractor === defaultSelect;

  // Helper function to create the indentation for each line
  const indent = (spaces) => " ".repeat(spaces);

  return (
    <div>
      <span className="HeaderSmall">😺 Meowzers, a YAML! 😺</span>
      <pre>
        {`district: ${district}`}
        {showPipelineError ? "" : `\n${indent(0)}pipeline: ${pipeline}`}
        {`\n${indent(0)}description: ${description}`}
        {showExtractorError ? "" : `\n${indent(0)}extractor: ${extractor}`}
        {showExtractorError
          ? ""
          : Object.keys(extractArgs).length > 0
          ? `\n${indent(0)}extract: ${Object.entries(extractArgs)
              .map(([key, value]) => `\n${indent(2)}${key}: ${value}`)
              .join("")}`
          : ""}
        {processingScript
          ? `\n${indent(0)}processing:\n${indent(2)}processing_type: custom\n${indent(
              2
            )}script: ${processingScript}`
          : ""}
        {`\nmapping: ${mapping}`}
        {`\nschedule:\n${indent(2)}dow: [${scheduleDOWNumbers.join(", ")}]\n${indent(
          2
        )}time: ${scheduleTime}`}
        {`\napply: ${apply}`}</pre>
      {showPipelineError && (
        <div className="ErrorMessage">Please select a pipeline.</div>
      )}
      {showExtractorError && (
        <div className="ErrorMessage">Please select an Extractor.</div>
      )}
    </div>
  );
}

export default ConfigYAMLGenerator;
