import React, { memo } from "react";
import styled from "styled-components";

import ChartComponent from "./ChartComponent";
import MessageButtonComponent from "./MessageButtonComponent";

const Title = styled.h1`
  width: 350px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 18px;
  font-weight: 500;
`;

const Div = styled.div`
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 350px;
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #6b728e68;
  border-radius: 8px;
  width: 400px;
`;

const DayRecordComponent = memo(() => {
  const text =
    "24시간을 기준으로 총 공부 시간 비율이 계산됩니다. (새로고침으로 반영)";
  const storedData = JSON.parse(localStorage.getItem("key") || "[]");
  const latestData = storedData[storedData.length - 1] || { value: "0" };
  const studyTimeToNumber = Number(latestData.value);

  const chartData = {
    labels: ["공부시간", "그 외"],
    datasets: [
      {
        label: "시간",
        data: [studyTimeToNumber, 24 - studyTimeToNumber],
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
    <ChartBox>
      <Title>
        총 공부 시간
        <MessageButtonComponent text={text} />
      </Title>
      <Div>
        <ChartComponent chartData={chartData} chartOption={chartOption} />
      </Div>
    </ChartBox>
  );
});

export default DayRecordComponent;
