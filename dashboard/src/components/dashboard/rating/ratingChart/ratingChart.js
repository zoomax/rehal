import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./ratingChart.css";
export const RatingChart = ({ docs: placeRates }) => {
  const [ratesPerMonth, setRatesPerMonth] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  function fillDataIntoChart(docs) {
    console.log(docs);
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    docs.forEach(({ updatedAt }) => {
      const month = new Date(updatedAt).getMonth();
      data[month]++;
    });
    return setRatesPerMonth(data);
  }
  useEffect(() => {
    fillDataIntoChart(placeRates);
  }, [placeRates]);
  const data = {
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
        data: ratesPerMonth,
        barPercentage: 0.5,
      },
    ],
  };
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
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };
  return (
    <div className='rating-chart'>
      <div className='container'>
        <Bar data={data} width={null} height={null} options={options} />
      </div>
    </div>
  );
};
