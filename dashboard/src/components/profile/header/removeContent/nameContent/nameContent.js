import React from "react";
import deleteIcon from "../../../../../assets/images/delete.svg";
import "./nameContent.css";

export const NameContent = () => {
  return (
    <div className="name-content">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-9">
            <div className="row col-12">
              <div className="col-md-3 col-12">Pyramids</div>
              <div className="col-md-3 col-12">Giza</div>
              <div className="col-md-3 col-12">Tourist</div>
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
