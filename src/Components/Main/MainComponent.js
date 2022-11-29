import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  totalStudyTime,
  studyHour,
  studyMinute,
  studySecond,
} from "../../recoil/concentrate";
import StopWatchDetailComponent from "./StopWatchDetail/StopWatchDetailComponent";
import StopWatchComponent from "./StopWatch/StopWatchComponent";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-size: 20px;
`;

const StudyTime = styled.div`
  display: flex;
  font-size: 60px;
  margin: 30px;
`;

const MainComponent = () => {
  const start = useRecoilValue(stopWatchStart);
  const pass = useRecoilValue(studyTimePass);

  const [hour, setHour] = useRecoilState(studyHour);
  const [minute, setMinute] = useRecoilState(studyMinute);
  const [second, setSecond] = useRecoilState(studySecond);

  //const [hour, setHour] = useState(localStorage.getItem("hour") ?? 0);
  //const [minute, setMinute] = useState(localStorage.getItem("minute") ?? 0);
  //const [second, setSecond] = useState(localStorage.getItem("second") ?? 0);

  useEffect(() => {
    if (pass === true) setTimeout(() => setSecond(second + 1), 1000);

    console.log("hello");

    if (second > 59) {
      setSecond(0);
      setMinute(minute + 1);
    }
    if (minute > 59) {
      setMinute(0);
      setHour(hour + 1);
    }
  }, [start, pass, second, minute, hour]);

  return (
    <Main>
      <StudyTime>
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:${String(second).padStart(2, "0")}`}
      </StudyTime>
      {start === true ? <StopWatchDetailComponent /> : <StopWatchComponent />}
    </Main>
  );
};

export default MainComponent;
