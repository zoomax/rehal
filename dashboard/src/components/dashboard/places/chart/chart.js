import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./chart.css";
export class Chart extends Component {
  state = {
    data: {
      labels: [
        "Jan",
        "Febr",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "sept",
        "oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "viewer",
          backgroundColor: "#2699FB",
          borderColor: "#2699FB",
          borderWidth: 1,
          hoverBackgroundColor: "#2699FB",
          hoverBorderColor: "#2699FB",
          data: [100, 110, 120, 200, 56, 55, 40, 100, 110, 120, 200, 56],
          barPercentage: 1.0,
        },
        {
          label: "booking",
          backgroundColor: "#BCE0FD",
          borderColor: "#BCE0FD",
          borderWidth: 1,
          hoverBackgroundColor: "#BCE0FD",
          hoverBorderColor: "#BCE0FD",
          data: [130, 130, 170, 300, 16, 85, 20, 130, 130, 170, 300],
          barPercentage: 1.0,
        },
      ],
    },
  };
  render() {
    const options = {
      responsive: true,
      legend: {
        display: true,
        position: "left",
      },
      type: "bar",

      scales: {
        xAxes: {
          ticks: {
            autoSkip: false,
            minRotation: 90,
            maxRotation: 90,
          },
        },
        yAxes: {
          min: 0,
          max: 500,
          ticks: {
            stepSize: 100,
          },
        },
      },
    };

    return (
      <div className="place-chart">
        <div className="container">
          {" "}
          <Bar
            data={this.state.data}
            width={null}
            height={null}
            options={options}
          />
        </div>
      </div>
    );
  }
}
