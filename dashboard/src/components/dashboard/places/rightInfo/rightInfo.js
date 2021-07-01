import React, { Component } from "react";
import "./rightInfo.css";
export class RightInfo extends Component {
  render() {
    return (
      <div className="right-info">
        <div className="place">
          <p>Place Name</p>
        </div>
        <div className="city">
          <p> CityName</p>
        </div>
        <div className="service">
          <p>ServiceType</p>
        </div>
        <div className="rate">
          <p>
            <i className="fa fa-star"></i>3.5
          </p>
        </div>
      </div>
    );
  }
}
