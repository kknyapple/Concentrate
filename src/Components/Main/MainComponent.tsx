import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  studyHour,
  studyMinute,
  studySecond,
  startTime,
  pauseTime,
  todayDate,
  calendarData,
} from "../../recoil/concentrate";
import StopWatchDetailComponent from "./StopWatchDetail/StopWatchDetailComponent";
import StopWatchComponent from "./StopWatch/StopWatchComponent";
import RecordComponent from "./Record/RecordComponent";
import MemoComponent from "./Memo/MemoComponent";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-size: 20px;
`;

const TotalTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 52px;
`;

const Time = styled.p``;

const MainComponent = () => {
  const start = useRecoilValue(stopWatchStart);
  const pass = useRecoilValue(studyTimePass);
  //const timeoutId = useRecoilState(timeoutId);

  const [hour, setHour] = useRecoilState<number>(studyHour);
  const [minute, setMinute] = useRecoilState<number>(studyMinute);
  const [second, setSecond] = useRecoilState<number>(studySecond);

  const [currentStartTime, setCurrentStartTime] =
    useRecoilState<number>(startTime);
  const [currentPauseTime, setCurrentPauseTime] =
    useRecoilState<number>(pauseTime);

  const [today, setToday] = useRecoilState<string | null>(todayDate);
  let time = Number(hour + minute / 60 + second / 3600).toFixed(3);
  let [timeData, setTimeData] =
    useRecoilState<Array<{ value: string; day: string }>>(calendarData);

  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");

  const startTotalTime = () => {
    const now = new Date(Date.now() - (currentStartTime || 0));

    setSecond(now.getUTCSeconds());
    setMinute(now.getUTCMinutes());
    setHour(now.getUTCHours());
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

  useEffect(() => {
    if (pass === true) {
      startTotalTime();
      changeLocalKey();
      changeLocalTime();
      let timerId = setTimeout(() => {
        startTotalTime();
        changeLocalKey();
        changeLocalTime();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [pass, second]);

  const resetStudyTime = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
  };

  const resetLocalTime = () => {
    localStorage.setItem("hour", String(hour));
    localStorage.setItem("minute", String(minute));
    localStorage.setItem("second", String(second));
  };

  const resetCurrentTime = () => {
    setCurrentStartTime(0);
    setCurrentPauseTime(0);
  };

  const reset = () => {
    resetStudyTime();
    resetLocalTime();
    resetCurrentTime();
  };

  useEffect(() => {
    setToday(`${year}-${month}-${day}`);

    if (localStorage.getItem("key")) {
      let length = JSON.parse(localStorage.getItem("key") as string).length;
      let lastStudy = JSON.parse(localStorage.getItem("key") as string)[
        length - 1
      ].day;
      let today = `${year}-${month}-${day}`;

      let savedTime =
        currentStartTime -
        second * 1000 -
        minute * 1000 * 60 -
        hour * 1000 * 60 * 60;

      lastStudy === today ? setCurrentStartTime(savedTime) : reset();
    }
  }, []);

  return (
    <Main>
      <TotalTime>
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:${String(second).padStart(2, "0")}`}
      </TotalTime>
      <MemoComponent />
      {start === true ? <StopWatchDetailComponent /> : <StopWatchComponent />}
      <RecordComponent />
    </Main>
  );
};

export default MainComponent;