import React from "react";
import arrow from "../../../../assets/images/arrow.svg";
import "./showAllContent.css";
import { withRouter } from "react-router";
const ShowAllContent = (props) => {
  const redirect = () => {
    props.history.push("/profile/all");
  };
  return (
    <div className="showAll-content">
      {" "}
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-9">
            <div className="row col-12">
              <div className="col-md-3 col-12">City</div>
              <div className="col-md-3 col-12">Types</div>
            </div>
          </div>
          <div className="col-md-4 col-3">
            <div className="img-border">
              <img src={arrow} alt="arrow" onClick={redirect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(ShowAllContent);
