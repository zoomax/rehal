import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./ratingChart.css";
export class RatingChart extends Component {
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
          label: "raters",
          backgroundColor: "#2699FB",
          borderColor: "#2699FB",
          borderWidth: 1,
          hoverBackgroundColor: "#2699FB",
          hoverBorderColor: "#2699FB",
          data: [100, 110, 120, 200, 56, 55, 40, 100, 110, 120, 200, 56],
          barPercentage: 0.5,
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
      <div className="rating-chart">
        <div className="container">
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
