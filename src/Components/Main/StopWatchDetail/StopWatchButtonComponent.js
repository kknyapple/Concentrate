import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  pauseClicked,
  stopWatchStart,
  studyHour,
  studyMinute,
  studySecond,
  studyTimePass,
} from "../../../recoil/concentrate";

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

const StopWatchButtonBox = styled.div`
  display: flex;
  padding-top: 15px;
`;

const StopWatchButtonComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);
  const hour = useRecoilValue(studyHour);
  const minute = useRecoilValue(studyMinute);
  const second = useRecoilValue(studySecond);
  //const [pause, setPause] = useState(false);

  let data = [{ value: "00:05:55", day: "2022-11-28" }];

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  let today = `${year}-${month}-${day}`;

  let time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;

  return (
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
          setPause(false);
          data.push({ value: time, day: today });
          localStorage.setItem("key", JSON.stringify(data));
          localStorage.setItem("hour", hour);
          localStorage.setItem("minute", minute);
          localStorage.setItem("second", second);
        }}
      >
        ■
      </Stop>
    </StopWatchButtonBox>
  );
};

export default StopWatchButtonComponent;
