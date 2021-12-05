import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Line } from "react-chartjs-2";

import chartdt from "./chartdata.json";

const Pchart = () => {
  const [chartData, setChartData] = useState();
  const [cum, setCum] = useState(false);

  useEffect(() => {
    let cumnum = 0,
      lblDt = [],
      dayDt = [],
      cumDt = [];
    chartdt.history.map((row) => {
      lblDt.push(row.date);
      dayDt.push(row.value);
      cumnum += row.value;
      cumDt.push(cumnum);
    });
    setChartData({
      labels: lblDt,
      data: dayDt,
      datacum: cumDt,
    });
  }, [cum]);

  const labels = chartData?.labels;

  function setActiveLink(setActive) {
    if ($("a").hasClass("active")) $("a").removeClass("active");
    if (setActive) $("#" + setActive).addClass("active");
  }
  console.log(cum);
  return (
    <div>
      <div className="container">
        <div className="head">
          <h4>
            조회수 히스토리데이터<span>(최근 1년)</span>
          </h4>
          <div className="submenu">
            <a
              id="daily"
              href="#"
              className="active"
              onClick={() => {
                setCum(false);
                setActiveLink("daily");
              }}
            >
              일별데이터
            </a>
            <a
              id="cum"
              href="#"
              onClick={() => {
                setCum(true);
                setActiveLink("cum");
              }}
            >
              누적데이터
            </a>
          </div>
        </div>
        <Line
          options={{
            title: {
              display: false,
              text: "조회수 히스토리 데이터(최근 1년)",
            },
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                      return cum
                        ? `${value / 100000000}억`
                        : `${value / 10000}만`;
                    },
                  },
                },
              ],
            },
          }}
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
    </div>
  );
};

export default Pchart;
