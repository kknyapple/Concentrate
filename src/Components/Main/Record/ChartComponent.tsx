import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import {
  Chart,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

const Canvas = styled.canvas`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;
`;

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

  return <Canvas ref={canvasDom}></Canvas>;
};

export default ChartComponent;
