import React from "react";
// import { TouristIcon } from "../../elements/touristIcon/touristIcon";
// import { Food } from "../../elements/food/food";
// import { Hospital } from "../../elements/hospital/hospital";
// import { Clubs } from "../../elements/clubs/clubs";
import "./header.css";
import { Visibility } from "../../elements/visibility/visibility";
import { Foundation } from "../../elements/foundation/foundation";
const Header = ({ openDiv, services, getTotalRates, places }) => {
  return (
    <div className='dashboard-header'>
      <div >
        <div className='row'>
          {services.map((service, index) => {
            const data = getTotalRates(service.id, places);
            return (
              <div className='col-md-3 col-sm-3 col-6' key={index}>
                <div
                  className={`data text-center ${service.name} `}
                  onClick={() => openDiv(service.id)}>
                  <img src={service.image} alt='service-pic' />
                  {/* {service.image} */}
                  <h2>{service.name}</h2>
                  <div className='row'>
                    <p>
                      {data.reviews}
                      <Visibility />
                    </p>

                    <p>
                      {data.totalRates}
                      <Foundation />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
