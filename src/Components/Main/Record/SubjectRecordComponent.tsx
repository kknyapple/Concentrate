import React from "react";
import styled from "styled-components";

import ChartComponent from "./ChartComponent";

const Div = styled.div`
  // margin-top: 10px;
  // margin-bottom: 10px;
  width: 400px;
`;
const SubjectRecordComponent = () => {
  const chartData = {
    labels: ["공부시간", "그 외"],
    datasets: [
      {
        label: "시간",
        data: [9, 15],
        borderColor: "transparent",
        backgroundColor: ["#EA5455", "#9c9c9c"],
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
      <Div>과목별 공부 비율</Div>
      <Div>
        <ChartComponent chartData={chartData} chartOption={chartOption} />
      </Div>
    </>
  );
};

export default SubjectRecordComponent;
