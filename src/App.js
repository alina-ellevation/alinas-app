import "./App.css";
import './Fonts.css';
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

  const [district, setDistrict] = React.useState("ESLREPS-AA-DEMO");
  const [pipeline, setPipeline] = React.useState(defaultSelect);
  const [description, setDescription] = React.useState("What this job does");
  const [extractor, setExtractor] = React.useState(defaultSelect);
  const [extractArgs, setExtractArgs] = React.useState({});
  const [processingScript, setProcessingScript] = React.useState("");
  const [mapping, setMapping] = React.useState("!include mappings/file.yml");
  const [scheduleDOW, setScheduleDOW] = React.useState([]);
  const [scheduleTime, setScheduleTime] = React.useState("00:00");
  const [apply, setApply] = React.useState(false);

  const handleDistrictChange = (value) => {
    setDistrict(value);
    setExtractArgs({}); // If the district changed, clear out all extract args just to be safe
  };

  const districtLowerCase = `${district
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
      /* TODO: make a reusable ClasslinkTenantIDField component;
      I tried but it choked whenever the value was being edited. */
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
      /* TODO: make a reusable FormatDropdown component;
      I tried but it did not respect selection changes. */
      <Dropdown label="format" items={["csv", "tsv"]} />,
    ],
    simple_sftp: [
      <TextEntryField label="dataset" />,
      <TextEntryField label="filepath" />,
      <Dropdown label="format" items={["csv", "tsv"]} />,
    ],
    STAR: [<TextEntryField label="rl_district_name" />],
  };

  return (
    <div className="App">
      <div className="LeftColumn">
        <img src="/logo.png" className="App-logo" alt="logo" />
        <p className="Header">TCats Job Config Generator</p>
      </div>
      <div className="MiddleColumn">
        <TextEntryField
          label="district"
          value={district}
          handleChange={handleDistrictChange}
        />
        <Dropdown
          label="pipeline"
          items={[defaultSelect, "assessment_results", "enrollment", "staff"]}
          value={pipeline}
          handleChange={setPipeline}
        />
        <TextEntryField
          label="description"
          value={description}
          handleChange={setDescription}
        />
        <DropdownNestedArgs
          label="extractor"
          itemsWithArgs={extractorsWithArgs}
          selectedItem={extractor}
          handleChangeSelectedItem={setExtractor}
          args={extractArgs}
          setArgs={setExtractArgs}
        />
        <TextEntryField
          label="processing_script"
          value={processingScript}
          handleChange={setProcessingScript}
        />
        <TextEntryField
          label="mapping"
          value={mapping}
          handleChange={setMapping}
        />
        <CheckMultiple
          label="schedule_dow"
          items={daysOfWeek}
          value={scheduleDOW}
          setValue={setScheduleDOW}
        />
        <TimeInput
          label="schedule_time"
          value={scheduleTime}
          handleChange={setScheduleTime}
        />
        <Checkbox label="apply" value={apply} handleChange={setApply} />
      </div>
      <div className="RightColumn">
        <ConfigYAMLGenerator
          district={district}
          pipeline={pipeline}
          description={description}
          extractor={extractor}
          extractArgs={extractArgs}
          processingScript={processingScript}
          mapping={mapping}
          scheduleDOW={scheduleDOW}
          scheduleTime={scheduleTime}
          apply={apply}
          daysOfWeek={daysOfWeek}
          defaultSelect={defaultSelect}
        />
      </div>
    </div>
  );
}

export default JobConfigurationGenerator;
