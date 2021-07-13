import React, { Component } from "react";
import "./rightInfo.css";
export class RightInfo extends Component {
  render() {
    let { place, services, cities } = this.props;
    return (
      <div className='right-info'>
        <div className='place'>
          <p>{place.name ? place.name : "Name"}</p>
        </div>
        <div className='city'>
          <p>
            {place.service
              ? cities.find(
                  (city) => city.id.toString() === place.city.toString(),
                ).name
              : "City Name"}
          </p>
        </div>
        <div className='service'>
          <p>
            {place.service
              ? services.find(
                  (service) =>
                    service.id.toString() === place.service.toString(),
                ).name
              : "Service Name"}
          </p>
        </div>
        <div className='rate'>
          <p>
            <i className='fa fa-star'></i>
            {place.rating ? place.rating : "0.0"}
          </p>
        </div>
      </div>
    );
  }
}
