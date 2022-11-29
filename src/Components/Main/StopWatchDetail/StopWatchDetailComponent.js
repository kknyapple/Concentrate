import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { stopWatchStart, timePass } from "../../../recoil/concentrate";

const StopWatchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #6b728e;
  border-radius: 8px;
  height: 200px;
  width: 500px;
`;

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const ConcentrateTime = styled.div`
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

const StopWatch = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const StopWatchButtonBox = styled.div`
  display: flex;
  padding-top: 15px;
`;

const Name = styled.p``;
const Number = styled.p``;

const StopWatchDetailComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(timePass);
  const [pause, setPause] = useState(false);

  return (
    <StopWatchBox>
      <StopWatch>
        <RestTime>
          <Name>쉬는시간</Name>
          <Number>00:00:00</Number>
        </RestTime>
        <ConcentrateTime>
          <Name>집중시간</Name>
          <Number>00:00:00</Number>
        </ConcentrateTime>
      </StopWatch>
      <StopWatchButtonBox>
        {pause == false ? (
          <Pause
            onClick={() => {
              setPause(true);
              setPass(false);
            }}
          >
            ●
          </Pause>
        ) : (
          <Continue
            onClick={() => {
              setPause(false);
              setPass(true);
            }}
          >
            ▶
          </Continue>
        )}
        <Stop
          onClick={() => {
            setPass(false);
            setStart(false);
          }}
        >
          ■
        </Stop>
      </StopWatchButtonBox>
    </StopWatchBox>
  );
};

export default StopWatchDetailComponent;
