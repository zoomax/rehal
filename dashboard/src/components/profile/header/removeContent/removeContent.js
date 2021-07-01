import React from "react";
import deleteIcon from "../../../../assets/images/delete.svg";
import "./removeContent.css";

export const RemoveContent = (props) => {
  return (
    <div className="remove-content" id={props.openName ? "hidden" : ""}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-9">
            <div className="row col-12">
              <div
                className="col-md-3 col-12"
                onClick={props.nameClicked}
                style={{ cursor: "pointer" }}
              >
                Name
              </div>
              <div className="col-md-3 col-12">City</div>
              <div className="col-md-3 col-12">Types</div>
            </div>
          </div>
          <div className="col-md-4 col-3">
            <div className="img-border">
              <img src={deleteIcon} alt="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
