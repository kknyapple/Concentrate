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
  startCTime,
  pauseCTime,
  startRTime,
  pauseRTime,
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
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);
  const hour = useRecoilValue(studyHour);
  const minute = useRecoilValue(studyMinute);
  const second = useRecoilValue(studySecond);
  let [timeData, setTimeData] = useRecoilState(calendarData);

  const [today, setToday] = useRecoilState(todayDate);
  let time = Number(hour + minute / 60 + second / 3600).toFixed(3);

  const [currentPauseTime, setCurrentPauseTime] = useRecoilState(pauseTime);

  const [currentStartCTime, setCurrentStartCTime] = useRecoilState(startCTime);
  const [currentPauseCTime, setCurrentPauseCTime] = useRecoilState(pauseCTime);

  const [currentStartRTime, setCurrentStartRTime] = useRecoilState(startRTime);
  const [currentPauseRTime, setCurrentPauseRTime] = useRecoilState(pauseRTime);

  const changeCondition = (pass, start, pause) => {
    setPass(pass);
    setStart(start);
    setPause(pause);
  };

  const changeLocalTime = () => {
    localStorage.setItem("hour", hour);
    localStorage.setItem("minute", minute);
    localStorage.setItem("second", second);
  };

  const changeLocalKey = () => {
    const cleanTimeData = timeData.filter((data) => data.day !== today);
    let copy = [...cleanTimeData];
    copy.push({ value: time, day: today });
    setTimeData(copy);
    localStorage.setItem("key", JSON.stringify(copy));
  };

  const stopOnClickHandler = () => {
    changeCondition(false, false, false);

    changeLocalKey();
    changeLocalTime();

    setCurrentPauseTime(Date.now());
    setCurrentPauseCTime(null);
    setCurrentStartCTime(null);
    setCurrentPauseRTime(null);
    setCurrentStartRTime(null);
  };

  return (
    <>{pass ? <Stop onClick={stopOnClickHandler}>■</Stop> : <Stop>■</Stop>}</>
  );
};

export default StopWatchStopComponent;
