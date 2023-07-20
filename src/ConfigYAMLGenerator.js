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
  daysOfWeek,
  defaultSelect,
}) {
  const scheduleDOWNumbers = scheduleDOW
    .map((day) => daysOfWeek.indexOf(day) + 1)
    .sort((a, b) => a - b);

  const showPipelineError = pipeline === defaultSelect;
  const showExtractorError = extractor === defaultSelect;
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const isValidScheduleTime = timeRegex.test(scheduleTime);

  // Helper function to create the indentation for each line
  const indent = (spaces) => " ".repeat(spaces);

  return (
    <div>
      <span className="HeaderSmall">😺 Meowzers, a YAML! 😺</span>
      <br />
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
          ? `\n${indent(0)}processing:\n${indent(
              2
            )}processing_type: custom\n${indent(2)}script: ${processingScript}`
          : ""}
        {`\nmapping: ${mapping}`}
        {`\nschedule:\n${indent(2)}dow: [${scheduleDOWNumbers.join(
          ", "
        )}]\n${indent(2)}time: ${scheduleTime}`}
        {`\napply: ${apply}`}
      </pre>
      <br />
      {showPipelineError && (
        <div className="ErrorMessage">Please select a pipeline.</div>
      )}
      {showExtractorError && (
        <div className="ErrorMessage">Please select an extractor.</div>
      )}
      {!isValidScheduleTime && (
        <div className="ErrorMessage">Please enter a valid schedule_time.</div>
      )}
    </div>
  );
}

export default ConfigYAMLGenerator;
