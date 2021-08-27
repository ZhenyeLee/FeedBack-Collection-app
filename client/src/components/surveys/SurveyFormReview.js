import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label style={{ color: "#757575", fontSize: "20px" }}>{label}</label>
        <div style={{ marginBottom: "20px", fontSize: "20px" }}>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <h4 style={{ marginBottom: "30px" }}> Please comfirm your entries</h4>
      {reviewFields}

      <button
        type="submit"
        className="btn-flat waves-effect  white-text  blue darken-1 right"
        style={{ margin: "0 15px" }}
        onClick={() => submitSurvey(formValues, history)}
      >
        <i className="material-icons right">email</i>
        Send Survey
      </button>

      <button
        type="submit"
        className="btn-flat waves-effect  white-text  yellow darken-3 right"
        onClick={onCancel}
      >
        Back
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
