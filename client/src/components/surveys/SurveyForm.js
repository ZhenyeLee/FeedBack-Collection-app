import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./fromFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/* <Field type="text" name="surveyTitle" component="input" /> */}
          {this.renderFields()}
          <div className="container grey lighten-1">
            <button
              type="submit"
              className="btn-flat waves-effect  white-text  blue darken-1 right"
              style={{ margin: "0 15px" }}
            >
              <i className="material-icons right">done</i>
              NEXT
            </button>
            <Link
              to="/surveys"
              className="btn-flat waves-effect  white-text  red lighten-1 right"
            >
              <i className="material-icons right">cancel</i> Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.recipients || "");
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}
export default reduxForm({
  validate,
  form: "surveyForm", //fromname in sate in SurveyFromReview
  destroyOnUnmount: false,
})(SurveyForm);
