import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container" style={{ position: "relative" }}>
      Dashboard
      <div class="fixed-action-btn">
        <Link
          to="/surveys/new"
          class="btn-floating btn-large waves-effect waves-light  light-blue darken-2"
          style={{ position: "absolute", bottom: "700px", right: "200px" }}
        >
          <i class="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
