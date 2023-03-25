import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  calendarData,
  pauseClicked,
  stopWatchStart,
  studyHour,
  studyMinute,
  studySecond,
  studyTimePass,
  pauseTime,
  todayDate,
  startRTime,
  pauseRTime,
  concentrateTimeState,
} from "../../../../recoil/concentrate";

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
  cursor: pointer;
`;

const StopWatchStopComponent = () => {
  const [start, setStart] = useRecoilState<boolean>(stopWatchStart);
  const [pass, setPass] = useRecoilState<boolean>(studyTimePass);
  const [pause, setPause] = useRecoilState<boolean>(pauseClicked);
  const hour = useRecoilValue(studyHour);
  const minute = useRecoilValue(studyMinute);
  const second = useRecoilValue(studySecond);
  let [timeData, setTimeData] = useRecoilState(calendarData);

  const [today, setToday] = useRecoilState(todayDate);
  let time = Number(hour + minute / 60 + second / 3600).toFixed(3);

  const [currentPauseTime, setCurrentPauseTime] =
    useRecoilState<number>(pauseTime);

  const [currentStartRTime, setCurrentStartRTime] =
    useRecoilState<number>(startRTime);
  const [currentPauseRTime, setCurrentPauseRTime] =
    useRecoilState<number>(pauseRTime);

  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);

  const changeCondition = (pass: boolean, start: boolean, pause: boolean) => {
    setPass(pass);
    setStart(start);
    setPause(pause);
  };

  const changeLocalTime = () => {
    localStorage.setItem("hour", String(hour));
    localStorage.setItem("minute", String(minute));
    localStorage.setItem("second", String(second));
  };

  const changeLocalKey = () => {
    const cleanTimeData = timeData.filter((data) => data.day !== today);
    let copy = [...cleanTimeData];
    const todayString = today ?? "";
    copy.push({ value: time, day: todayString });
    setTimeData(copy);
    localStorage.setItem("key", JSON.stringify(copy));
  };

  const stopOnClickHandler = () => {
    changeCondition(false, false, false);

    changeLocalKey();
    changeLocalTime();

    setCurrentPauseTime(Date.now());
    setConcentrateTime({ start: 0, pause: 0 });
    setCurrentPauseRTime(0);
    setCurrentStartRTime(0);
  };

  return (
    <>{pass ? <Stop onClick={stopOnClickHandler}>■</Stop> : <Stop>■</Stop>}</>
  );
};

export default StopWatchStopComponent;
