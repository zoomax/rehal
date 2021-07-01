import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class TotalChart extends Component {
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
          label: "tourist",
          data: ["0", " ", "", "", "90", "", 199, "", "", 70],
          fill: false,
          borderColor: this.props.borderColor,
          backgroundColor: "gray",
          type: "line",
          lineTension: 0.3,
          pointBorderColor: "gray",
          pointBackgroundColor: "#FFF",
          pointRadius: 5,
        },
        {
          label: "Food",
          fill: false,
          backgroundColor: "#FF00B2",
          type: "line",
          lineTension: 0.3,
          data: ["0", " ", "", "", "90", "", 300, "", "", 70],
          borderColor: "#FF00B2",
          pointBackgroundColor: "#FFF",
          pointRadius: 5,
        },
        {
          label: "hospital",
          data: ["0", " ", "", "", "90", "", 100, "", "", 70],
          borderColor: "#EC8181",
          fill: false,
          backgroundColor: "#EC8181",
          type: "line",
          lineTension: 0.3,
          pointBorderColor: "gray",
          pointBackgroundColor: "#FFF",
          pointRadius: 5,
        },
        {
          label: "clubs",
          data: ["0", " ", "", "", "90", "", 39, "", "", 70],
          borderColor: "#00FF00",
          fill: false,
          backgroundColor: "#00FF00",
          type: "line",
          lineTension: 0.3,
          pointBorderColor: "gray",
          pointBackgroundColor: "#FFF",
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
