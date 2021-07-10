import React, { useEffect } from "react";
import "./body.css";
import { TouristIcon } from "../../elements/touristIcon/touristIcon";
import { Chart } from "./chart/chart";
import { Hospital } from "../../elements/hospital/hospital";
import { Clubs } from "../../elements/clubs/clubs";
import { Food } from "../../elements/food/food";
import { TotalChart } from "./totalChart/totalChart";
export const Body = (props) => {
  const { places, getTotalRates, id, services } = props;
  const servicesData = services.map((service) => {
    return {
      ...service,
      ...getTotalRates(service.id, places),
      chartData: ["0", " ", "", "", "90", "", 100, "", "", 70],
    };
  });
  servicesData.push({
    id: "total",
    name: "total",
    image: "",
    ...getTotalRates("total", places),
    chartData: ["0", " ", "", "", "90", "", 100, "", "", 70], 
  });
  const data = [
    {
      name: "total",
      page: 22555,
      Notification: 225551,
      comments: 3000,
      objects: 444,
      status: 5555,
      borderColor: "gray",
    },
    {
      name: "1",
      page: 22555,
      Notification: 225551,
      comments: 3000,
      objects: 444,
      status: 5555,
      icon: <TouristIcon />,
      chartData: ["0", " ", "", "", "90", "", 199, "", "", 70],
      borderColor: "gray",
    },
    {
      name: "2",
      page: 22555,
      Notification: 225552,
      comments: 3000,
      objects: 444,
      status: 5555,
      icon: <Food />,
      chartData: ["0", " ", "", "", "90", "", 300, "", "", 70],
      borderColor: "#FF00B2",
    },
    {
      name: "3",
      page: 22555,
      Notification: 225553,
      comments: 3000,
      objects: 444,
      status: 5555,
      icon: <Hospital />,
      chartData: ["0", " ", "", "", "90", "", 100, "", "", 70],
      borderColor: "#EC8181",
    },
    {
      name: "4",
      page: 22555,
      Notification: 225554,
      comments: 3000,
      objects: 444,
      status: 5555,
      icon: <Clubs />,
      chartData: ["0", " ", "", "", "90", "", 39, "", "", 70],
      borderColor: "#00FF00",
    },
  ];

  // const { places, getTotalRates, id  , services} = props;
  // const data  = getTotalRates(id, places) ;
  useEffect(() => {
    console.log("from dashboard body", getTotalRates(id, places));
  }, [places, id]);
  return (
    <div className='dashboard-body'>
      {servicesData.map((item, index) => {
        return (
          <div key={index} id={id === item.id ? "open" : "close"}>
            <div className='label'>
              {item.icon}
              <p> {item.name}</p>
            </div>
            <div className='total'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-2 col-md-3 col-6'>
                    <p>Reviews</p>
                    <span>{item.reviews}</span>
                    <div className='border-bottom'></div>
                  </div>
                  <div className='col-lg-2 col-md-3 col-6'>
                    <p>Total Rates</p>
                    <span>{item.totalRates}</span>
                    <div className='border-bottom'></div>
                  </div>
                  <div className='col-lg-2 col-md-3 col-6'>
                    <p>Minimum Rate</p>
                    <span>{item.minRate}</span>
                    <div className='border-bottom'></div>
                  </div>
                  <div className='col-lg-2 col-md-3 col-6'>
                    <p>Maximum Rate</p>
                    <span>{item.maxRate}</span>
                    <div className='border-bottom'></div>
                  </div>
                  <div className='col-lg-2 col-md-3 col-7'>
                    <p>Average Rate</p>
                    <span>{item.avgRate}</span>
                    <div className='border-bottom'></div>
                  </div>
                </div>
              </div>
            </div>

            {item.name === "total" ? (
              <TotalChart />
            ) : (
              <Chart
                chartData={item.chartData}
                borderColor={item.borderColor}
                name={item.name}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
