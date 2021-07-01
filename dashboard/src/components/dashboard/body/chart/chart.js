import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

export class Chart extends Component {
  state = {
    data: {
      labels: [
        "30",
        "60",
        "90",
        "120",
        "150",
        "180",
        "210",
        "240",
        "270",
        "300",
      ],
      datasets: [
        {
          label: this.props.name,
          data: this.props.chartData,
          fill: false,
          borderColor: this.props.borderColor,
          backgroundColor: this.props.borderColor,
          type: "line",
          lineTension: 0.3,
          pointBorderColor: "gray",
          pointBackgroundColor: "#fff",
          pointRadius: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 400,
        },
      },
    },
  };
  render() {
    let { data, options } = this.state;
    return (
      <div className="tourist-chart">
        {" "}
        <Line data={data} options={options} />
      </div>
    );
  }
}
