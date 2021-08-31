import React from "react";
import image from "../images/surveybackground.png";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }} className="card blue-grey lighten-5">
      <img className="responsive-img ratio" src={image} alt="img" />
      <h3
        style={{
          textAlign: "center",
          color: "#323232",
          fontFamily: "opensans-bold",
        }}
      >
        Send Surveys to Your Users!
      </h3>
    </div>
  );
};

export default Landing;
