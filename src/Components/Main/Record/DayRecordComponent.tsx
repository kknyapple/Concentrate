import React from "react";
import styled from "styled-components";

import ChartComponent from "./ChartComponent";

const Div = styled.div`
  // margin-top: 10px;
  // margin-bottom: 10px;
  width: 400px;
`;

const DayRecordComponent = () => {
  const chartData = {
    labels: ["공업수학", "반도체공학", "일반수학", "그 외"],
    datasets: [
      {
        label: "시간",
        data: [1.333, 3.324, 1.354, 0.322],
        borderColor: "transparent",
        backgroundColor: ["#F2789F", "#F999B7", "#F9C5D5", "#FEE3EC"],
        borderWidth: 3,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOption = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "whitesmoke",
        },
      },
    },
  };

  return (
    <>
      <Div>총 공부 시간</Div>
      <Div>
        <ChartComponent chartData={chartData} chartOption={chartOption} />
      </Div>
    </>
  );
};

export default DayRecordComponent;
