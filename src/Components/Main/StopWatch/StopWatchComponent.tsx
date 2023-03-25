import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  concentrateTimeState,
  timeState,
} from "../../../recoil/concentrate";
import StopWatchButtonComponent from "../StopWatchDetail/StopWatchButton/StopWatchButtonComponent";

const StopWatchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 80px;
  width: 400px;
`;

const StopWatchTitle = styled.p`
  display: flex;
  margin-left: 30px;
`;

const StopWatchButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 50%;
  font-size: 18px;
  height: 50px;
  // width: 50px;
  cursor: pointer;
`;

const StopWatchComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);

  const changeStartTime = () => {
    if (time.start === null) {
      setTime({ start: Date.now(), pause: time.pause });
    } else {
      setTime({
        start: time.start + Date.now() - time.pause,
        pause: time.pause,
      });
    }
  };

  const changeStartCTime = () => {
    if (concentrateTime.start === null) {
      setConcentrateTime({ start: Date.now(), pause: concentrateTime.pause });
    } else {
      setConcentrateTime({
        start: concentrateTime.start + Date.now() - concentrateTime.pause,
        pause: concentrateTime.pause,
      });
    }
  };

  return (
    <StopWatchBox>
      <StopWatchTitle>집중하기</StopWatchTitle>
      {start === true ? (
        <StopWatchButtonComponent />
      ) : (
        <StopWatchButton
          onClick={() => {
            setStart(true);
            setPass(true);
            changeStartTime();
            changeStartCTime();
          }}
        >
          시작
        </StopWatchButton>
      )}
    </StopWatchBox>
  );
};

export default StopWatchComponent;
