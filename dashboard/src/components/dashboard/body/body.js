import React, { Component } from "react";
import "./body.css";
import { TouristIcon } from "../../elements/touristIcon/touristIcon";
import { Chart } from "./chart/chart";
import { Hospital } from "../../elements/hospital/hospital";
import { Clubs } from "../../elements/clubs/clubs";
import { Food } from "../../elements/food/food";
import { TotalChart } from "./totalChart/totalChart";
export class Body extends Component {
  state = {
    data: [
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
        name: "tourist",
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
        name: "food",
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
        name: "hospital",
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
        name: "clubs",
        page: 22555,
        Notification: 225554,
        comments: 3000,
        objects: 444,
        status: 5555,
        icon: <Clubs />,
        chartData: ["0", " ", "", "", "90", "", 39, "", "", 70],
        borderColor: "#00FF00",
      },
    ],
  };
  render() {
    let { data } = this.state;
    return (
      <div className="dashboard-body">
        {data.map((data, id) => {
          return (
            <div key={id} id={this.props.id === data.name ? "open" : "close"}>
              <div className="label">
                {data.icon}
                <p> {data.name}</p>
              </div>
              <div className="total">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 col-6">
                      <p>Page View</p>
                      <span>{data.page}</span>
                      <div className="border-bottom"></div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-6">
                      <p>Notifications</p>
                      <span>{data.Notification}</span>
                      <div className="border-bottom"></div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-6">
                      <p>Comments</p>
                      <span>{data.comments}</span>
                      <div className="border-bottom"></div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-6">
                      <p>objects</p>
                      <span>{data.objects}</span>
                      <div className="border-bottom"></div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-7">
                      <p>users Status</p>
                      <span>{data.status}</span>
                      <div className="border-bottom"></div>
                    </div>
                  </div>
                </div>
              </div>

              {data.name === "total" ? (
                <TotalChart />
              ) : (
                <Chart
                  chartData={data.chartData}
                  borderColor={data.borderColor}
                  name={data.name}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
