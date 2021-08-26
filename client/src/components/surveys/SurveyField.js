import React from "react";

//Redux Form is ⬇️ automatically generating a bunch of event handlers in props
const SurveyField = ({ input, label, meta: { error, touched } }) => {
  //console.log(props.input);

  return (
    <div className="container">
      <label style={{ color: "#757575", fontSize: "20px" }}>{label}</label>
      <input {...input} style={{ marginBottom: "5px", fontSize: "20px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
export default SurveyField;
