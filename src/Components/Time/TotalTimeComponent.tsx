import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import { studyTimePass, todayDate, timeState } from "../../recoil/frontend";
import {
  filterTimeData,
  saveStudyDataToLocal,
  updateStudyData,
} from "utils/saveStudyDataToLocal";
import saveStudyTimeToLocal from "utils/saveStudyTimeToLocal";
import { StudyData } from "types/types";
import {
  calendarData,
  studyHour,
  studyMinute,
  studySecond,
} from "recoil/localStorage";

const TotalTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 52px;
`;

const TotalTimeComponent = () => {
  const pass = useRecoilValue(studyTimePass);
  const [hour, setHour] = useRecoilState<number>(studyHour);
  const [minute, setMinute] = useRecoilState<number>(studyMinute);
  const [second, setSecond] = useRecoilState<number>(studySecond);
  const [time, setTime] = useRecoilState(timeState);
  const [today, setToday] = useRecoilState<string>(todayDate);

  let convertTime = Number(hour + minute / 60 + second / 3600).toFixed(3);
  const [timeData, setTimeData] =
    useRecoilState<Array<{ value: string; day: string }>>(calendarData);

  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");

  const updateStudyTime = () => {
    const now = new Date(Date.now() - (time.start || 0));

    const s = now.getUTCSeconds();
    const m = now.getUTCMinutes();
    const h = now.getUTCHours();

    setSecond(s);
    setMinute(m);
    setHour(h);

    saveStudyTimeToLocal(h, m, s);
  };

  let cleanTimeData: StudyData[] = filterTimeData(timeData, today);
  let updatedStudyData: StudyData[] = updateStudyData(
    cleanTimeData,
    convertTime,
    today
  );

  useEffect(() => {
    if (pass) {
      updateStudyTime();
      saveStudyDataToLocal(updatedStudyData);
      setTimeData(updatedStudyData);
      let timerId = setInterval(() => {
        updateStudyTime();
        saveStudyDataToLocal(updatedStudyData);
        setTimeData(updatedStudyData);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [pass]);

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
    setTime({ start: 0, pause: 0 });
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
        time.start - second * 1000 - minute * 1000 * 60 - hour * 1000 * 60 * 60;

      lastStudy === today
        ? setTime({ start: savedTime, pause: time.pause })
        : reset();
    }
  }, []);

  return (
    <TotalTime>
      {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`}
    </TotalTime>
  );
};

export default TotalTimeComponent;
