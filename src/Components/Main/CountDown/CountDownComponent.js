import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { timerStart } from "../../../recoil/concentrate";

const CountDownBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #6b728e;
  border-radius: 8px;
  height: 200px;
  width: 500px;
`;

const SubjectTimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const ConcentrateTimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const Pause = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 18px;
  height: 50px;
  width: 50px;
`;
const Continue = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 18px;
  height: 50px;
  width: 50px;
`;
const Stop = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 18px;
  height: 50px;
  width: 50px;
`;

const Timer = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const TimerButton = styled.div`
  display: flex;
  padding-top: 15px;
`;

const Name = styled.p``;
const Number = styled.p``;

const CountDownComponent = () => {
  const [start, setStart] = useRecoilState(timerStart);
  const [pause, setPause] = useState(false);

  const handlePause = () => {
    setPause(!pause);
  };

  return (
    <CountDownBox>
      <Timer>
        <SubjectTimer>
          <Name>전공1</Name>
          <Number>00:00:00</Number>
        </SubjectTimer>
        <ConcentrateTimer>
          <Name>집중시간</Name>
          <Number>00:00:00</Number>
        </ConcentrateTimer>
      </Timer>
      <TimerButton>
        {pause == false ? (
          <Pause onClick={handlePause}>●</Pause>
        ) : (
          <Continue onClick={handlePause}>▶</Continue>
        )}
        <Stop
          onClick={() => {
            setStart(!start);
          }}
        >
          ■
        </Stop>
      </TimerButton>
    </CountDownBox>
  );
};

export default CountDownComponent;
