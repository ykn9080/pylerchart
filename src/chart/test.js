import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [5, 3, 4, 2, 5, 3, 3],
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return `£${value}kk`;
          },
        },
      },
    ],
  },
};

function App() {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default App;
