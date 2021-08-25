import React from "react";
import image from "../images/surveybackground.png";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }} className="card blue-grey lighten-5">
      <img class="responsive-img ratio" src={image} alt="img" />
      <h3 style={{ textAlign: "center", color: "#323232" }}>
        Collect feekback from users
      </h3>
      <span>Emaily</span>
    </div>
  );
};

export default Landing;
