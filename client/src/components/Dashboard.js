import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
  return (
    <div className="container" style={{ position: "relative" }}>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large waves-effect waves-light  light-blue darken-2"
          style={{ position: "absolute", bottom: "700px", right: "200px" }}
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
