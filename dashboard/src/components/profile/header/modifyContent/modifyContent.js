import React from "react";
import arrow from "../../../../assets/images/arrow.svg";
import "./modifyContent.css";
export const ModifyContent = (props) => {
  return (
    <div className="modify-content" id={props.modify ? "hideDiv" : "showDiv"}>
      {" "}
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-9">
            <div className="row col-12">
              <div className="col-md-3 col-12">Name</div>
              <div className="col-md-3 col-12">City</div>
              <div className="col-md-3 col-12">Types</div>
            </div>
          </div>
          <div className="col-md-4 col-3">
            <div className="img-border">
              <img src={arrow} alt="delete" onClick={props.modifyClicked} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
