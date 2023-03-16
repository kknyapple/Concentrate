import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  pauseClicked,
  studyTimePass,
  pauseCTime,
  startCTime,
  pauseTime,
  startTime,
  startRTime,
  pauseRTime,
} from "../../../../recoil/concentrate";

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
  cursor: pointer;
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
  cursor: pointer;
`;

const StopWatchPauseComponent = () => {
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [currentStartTime, setCurrentStartTime] = useRecoilState(startTime);
  const [currentPauseTime, setCurrentPauseTime] = useRecoilState(pauseTime);

  const [currentStartCTime, setCurrentStartCTime] = useRecoilState(startCTime);
  const [currentPauseCTime, setCurrentPauseCTime] = useRecoilState(pauseCTime);

  const [currentStartRTime, setCurrentStartRTime] = useRecoilState(startRTime);
  const [currentPauseRTime, setCurrentPauseRTime] = useRecoilState(pauseRTime);

  const changeCondition = (pass, pause) => {
    setPass(pass);
    setPause(pause);
  };

  const changeStartRTime = () => {
    if (currentStartRTime === null) {
      setCurrentStartRTime(Date.now());
      console.log(currentStartRTime);
    } else {
      setCurrentStartRTime(currentStartRTime + Date.now() - currentPauseRTime);
    }
  };

  const pauseOnClickHandler = () => {
    changeCondition(false, true);

    setCurrentPauseTime(Date.now());
    setCurrentPauseCTime(Date.now());

    changeStartRTime();
  };

  const continueOnClickHandler = () => {
    changeCondition(true, false);

    setCurrentStartTime(currentStartTime + Date.now() - currentPauseTime);
    setCurrentStartCTime(currentStartCTime + Date.now() - currentPauseCTime);

    setCurrentPauseRTime(Date.now());
  };

  return (
    <React.Fragment>
      {pause == false ? (
        <Pause onClick={pauseOnClickHandler}>●</Pause>
      ) : (
        <Continue onClick={continueOnClickHandler}>▶</Continue>
      )}
    </React.Fragment>
  );
};

export default StopWatchPauseComponent;
