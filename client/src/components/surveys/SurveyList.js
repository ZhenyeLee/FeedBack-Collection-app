import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/index";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card darken-1 key = {survey._id}">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on :{new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a> Yes : {survey.yes}</a>
            <a> No : {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Your Surveys</h3>
        <div className="surveys">{this.renderSurveys()}</div>
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
