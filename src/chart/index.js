import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import chartdt from "./chartdata.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Pchart = () => {
  const [chartData, setChartData] = useState();
  const [cum, setCum] = useState(false);

  useEffect(() => {
    let cumnum = 0;
    setChartData({
      labels: chartdt.history.map((row) => row.date),
      data: chartdt.history.map((row) => row.value),
      datacum: chartdt.history.map((row) => {
        cumnum += row.value;
        return cumnum;
      }),
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = chartData?.labels;

  const data = chartData
    ? {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: cum ? chartData.datacum : chartData.data,
            // data: [1, 2, 4, 1, 6, 3, 8],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }
    : null;

  return (
    <>
      <button onClick={() => setCum(true)}>cum</button>
      <button onClick={() => setCum(false)}>daily</button>
      {data && (
        <div className="container">
          <Line
            options={options}
            data={
              chartData
                ? {
                    labels,
                    datasets: [
                      {
                        label: "Dataset 1",
                        data: cum ? chartData.datacum : chartData.data,
                        // data: [1, 2, 4, 1, 6, 3, 8],
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                    ],
                  }
                : null
            }
          />
        </div>
      )}
    </>
  );
};

export default Pchart;
