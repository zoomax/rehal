import React from "react";
import { withRouter } from "react-router";
import "./totalData.css";
const TotalData = ({ place }) => {
  return (
    <div className='total-data'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-3'>
            <h5>Reviews</h5>
            <p>{place.reviews ? place.reviews : 0}</p>
            <div className='border-bottom'></div>
          </div>
          <div className='col-md-4 col-3'>
            <h5>Raters</h5>
            <p>{place.allRates ? place.allRates.length : 0}</p>
            <div className='border-bottom'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TotalData);
