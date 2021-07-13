import React, { Component } from "react";
import "./rightInfo.css";
export class RightInfo extends Component {
  render() {
    let { placeData } = this.props;
    return (
      <div className="right-info">
        <div className="place">
          <p>{placeData.name}</p>
        </div>
        <div className="city">
          <p> {placeData.city}</p>
        </div>
        <div className="service">
          <p>{placeData.service}</p>
        </div>
        <div className="rate">
          <p>
            <i className="fa fa-star"></i>
            {placeData.rating}
          </p>
        </div>
      </div>
    );
  }
}
