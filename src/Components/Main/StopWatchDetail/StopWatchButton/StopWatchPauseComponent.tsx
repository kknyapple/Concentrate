import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  pauseClicked,
  studyTimePass,
  pauseTime,
  startTime,
  startRTime,
  pauseRTime,
  concentrateTimeState,
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

  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);

  const [currentStartRTime, setCurrentStartRTime] = useRecoilState(startRTime);
  const [currentPauseRTime, setCurrentPauseRTime] = useRecoilState(pauseRTime);

  const changeCondition = (pass: boolean, pause: boolean) => {
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

    setConcentrateTime({ start: concentrateTime.start, pause: Date.now() });

    changeStartRTime();
  };

  const continueOnClickHandler = () => {
    changeCondition(true, false);

    setCurrentStartTime(currentStartTime + Date.now() - currentPauseTime);
    setConcentrateTime({
      start: concentrateTime.start + Date.now() - concentrateTime.pause,
      pause: concentrateTime.pause,
    });

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
