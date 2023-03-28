import React, { useRef, useEffect } from "react";
import {
  Chart,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

const ChartComponent = (props) => {
  const chartData = props.chartData;
  const chartOption = props.chartOption;
  const canvasDom = useRef(null);
  Chart.register(...registerables);
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

  useEffect(() => {
    const drawChart = async () => {
      const ctx = canvasDom.current.getContext("2d");

      await new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOption,
      });
    };

    drawChart();
  }, []);

  return <canvas ref={canvasDom}></canvas>;
};

export default ChartComponent;
