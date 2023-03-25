import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  pauseClicked,
  studyTimePass,
  concentrateTimeState,
  resetTimeState,
  timeState,
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

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);
  const [resetTime, setResetTime] = useRecoilState(resetTimeState);

  const changeCondition = (pass: boolean, pause: boolean) => {
    setPass(pass);
    setPause(pause);
  };

  const changeStartRTime = () => {
    if (resetTime.start === null) {
      setResetTime({ start: Date.now(), pause: resetTime.pause });
    } else {
      setResetTime({
        start: resetTime.start + Date.now() - resetTime.pause,
        pause: resetTime.pause,
      });
    }
  };

  const pauseOnClickHandler = () => {
    changeCondition(false, true);

    setTime({ start: time.start, pause: Date.now() });

    setConcentrateTime({ start: concentrateTime.start, pause: Date.now() });

    changeStartRTime();
  };

  const continueOnClickHandler = () => {
    changeCondition(true, false);

    setTime({ start: time.start + Date.now() - time.pause, pause: time.pause });
    setConcentrateTime({
      start: concentrateTime.start + Date.now() - concentrateTime.pause,
      pause: concentrateTime.pause,
    });
    setResetTime({ start: resetTime.start, pause: Date.now() });
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
