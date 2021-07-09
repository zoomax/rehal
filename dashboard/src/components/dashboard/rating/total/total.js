import React, { useState, useEffect } from "react";
import "./total.css";
export const Total = ({ docs: placeRates }) => {
  const [viewData, setViewData] = useState([]);
  useEffect(() => {
    const data = placeRates.map((doc) => doc.rating);
    const avg =
      data.length !== 0
        ? data.reduce((acc = 0, rating) => (acc += rating)) / data.length
        : 0;
    const min = Math.min(data);
    const max = Math.max(data);

    const viewData = [
      { names: "Raters", value: `${data.length}` },
      { names: "Rate Avg", value: `${avg}` },
      { names: "Top rate", value: `${max}` },
      { names: "Lowest rate", value: `${min}` },
    ];
    setViewData(viewData);
  }, [placeRates]);
  return (
    <div className='rating-total'>
      <div className='container'>
        <div className='row'>
          {viewData.map((data, id) => {
            return (
              <div className='col-md-2 col-sm-6 col-12' key={id}>
                <h5>{data.names}</h5>
                <p>{data.value}</p>
                <div className='border-bottom'></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
