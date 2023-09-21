import "./App.css";
import "./Fonts.css";
import React from "react";
import Checkbox from "./input_components/Checkbox";
import CheckMultiple from "./input_components/CheckMultiple";
import Dropdown from "./input_components/Dropdown";
import DropdownNestedArgs from "./input_components/DropdownNestedArgs";
import TextEntryField from "./input_components/TextEntryField";
import TimeInput from "./input_components/TimeInput";
import ConfigYAMLGenerator from "./ConfigYAMLGenerator";

function JobConfigurationGenerator() {
  const defaultSelect = "-- SELECT --";
  const [jobConfiguration, setJobConfiguration] = React.useState({
    district: "ESLREPS-AA-DEMO",
    pipeline: defaultSelect,
    description: "",
    extractor: defaultSelect,
    extract_args: {},
    processing_script: "",
    mapping: "!include mappings/file.yml",
    schedule_dow: [],
    schedule_time: "00:00",
    is_valid_schedule_time: true,
    apply: false,
  });

  const handleChange = (event) => {
    setJobConfiguration((prev) => ({
      ...prev,
      [event.target.label]: event.target.value, // label to match jobConfiguration property
    }));
  };

  // TODO: reintroduce this
  // const handleDistrictChange = (value) => {
  //   setDistrict(value);
  //   setExtractArgs({}); // If the district changed, clear out all extract args just to be safe
  // };

  const districtLowerCase = `${jobConfiguration.district
    .toLowerCase()
    .replace(/^(eslreps-)/, "")}`;

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const extractorsWithArgs = {
    [defaultSelect]: [],
    aeries_assessments: [
      <TextEntryField label="host_url" default="https://" />,
    ],
    classlink_enrollments: [
      // TODO: make a reusable ClasslinkTenantIDField component
      <TextEntryField label="tenant_id" intOnly={true} />,
    ],
    classlink_staff: [<TextEntryField label="tenant_id" intOnly={true} />],
    classlink_students: [<TextEntryField label="tenant_id" intOnly={true} />],
    clever_enrollments: [<TextEntryField label="district_id" />],
    nwea_api: [
      <TextEntryField
        label="secret_name"
        default={`/apps/prod/data-integration/${districtLowerCase}`}
      />,
    ],
    sharefile: [
      <TextEntryField label="id" />,
      <TextEntryField label="dataset" />,
      // TODO: make a reusable FormatDropdown component
      <Dropdown label="format" items={["csv", "tsv"]} />,
    ],
    simple_sftp: [
      <TextEntryField label="dataset" />,
      <TextEntryField label="filepath" />,
      <Dropdown label="format" items={["csv", "tsv"]} />,
    ],
    STAR: [<TextEntryField label="rl_district_name" />],
  };

  const jobConfigurationComponents = [
    <TextEntryField label="district" />,
    <Dropdown
      label="pipeline"
      items={[defaultSelect, "assessment_results", "enrollment", "staff"]}
    />,
    <TextEntryField label="description" />,
    <Dropdown label="extractor" items={Object.keys(extractorsWithArgs)} />, // TODO: replace with nested
    <TextEntryField label="processing_script" />,
    <TextEntryField label="mapping" />,
    <CheckMultiple label="schedule_dow" items={daysOfWeek} />,
    <TimeInput label="schedule_time" setJobConfiguration={setJobConfiguration}/>, // TODO: update handler to validate military time
    <Checkbox label="apply" />,
  ];

  return (
    <div className="App">
      <div className="LeftColumn">
        <img src="/logo.png" className="App-logo" alt="logo" />
        <p className="Header">TCats Job Config Generator</p>
      </div>
      <div className="MiddleColumn">
        {jobConfigurationComponents.map((component, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(component, {
              value: jobConfiguration[component.props.label],
              handleChange: handleChange,
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="RightColumn">
        <ConfigYAMLGenerator
          jobConfiguration={jobConfiguration}
          defaultSelect={defaultSelect}
          daysOfWeek={daysOfWeek}
        />
      </div>
    </div>
  );
}

export default JobConfigurationGenerator;
