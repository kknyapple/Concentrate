import React from "react";
import { useRecoilState } from "recoil";
import { subjectDataState } from "recoil/localStorage";
import styled from "styled-components";
import { Subject } from "types/types";

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

const SubjectRecordComponent = () => {
  const text =
    "총 공부 시간을 기준으로 과목 시간 비율이 계산됩니다. (새로고침으로 반영)";
  const [subjectData, setSubjectData] = useRecoilState(subjectDataState);
  let nameArray = subjectData.map((item: Subject) => item.name);
  let savedTimeArray = subjectData.map((item: Subject) => item.savedTime);

  if (savedTimeArray.every((element) => element === 0)) {
    savedTimeArray = savedTimeArray.map((element) =>
      element === 0 ? 0.001 : element
    );
  }

  const chartData = {
    labels: nameArray,
    datasets: [
      {
        label: "시간",
        data: savedTimeArray,
        borderColor: "transparent",
        backgroundColor: ["#ff6384", "#ffce56", "#36a2eb", "#cc65fe"],
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
        과목 공부 비율 <MessageButtonComponent text={text} />
      </Title>
      <Div>
        <ChartComponent chartData={chartData} chartOption={chartOption} />
      </Div>
    </ChartBox>
  );
};

export default SubjectRecordComponent;
