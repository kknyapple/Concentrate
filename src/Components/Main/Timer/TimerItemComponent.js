import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { timerStart } from "../../../recoil/concentrate";

const Timer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 60px;
  width: 500px;
`;

const TimerInfo = styled.p`
  display: flex;
  margin-left: 60px;
  margin-right: 60px;
`;

const TimerItemComponent = () => {
  const [start, setStart] = useRecoilState(timerStart);

  return (
    <Timer
      onClick={() => {
        setStart(!start);
      }}
    >
      <TimerInfo>공부</TimerInfo>
      <TimerInfo>00:00:00</TimerInfo>
    </Timer>
  );
};

export default TimerItemComponent;
