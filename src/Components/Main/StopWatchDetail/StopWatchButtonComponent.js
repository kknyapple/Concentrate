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
  let [timeData, setTimeData] = useRecoilState(calendarData);

  //let data = [
  //  { value: "3", day: "2022-11-27" },
  //  { value: "6.5", day: "2022-11-28" },
  //];

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  let today = `${year}-${month}-${day}`;

  let time = Number(hour + minute / 60 + second / 3600).toFixed(3);

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

          const cleanTimeData = timeData.filter((data) => data.day !== today);
          let copy = [...cleanTimeData];
          copy.push({ value: time, day: today });
          setTimeData(copy);
          localStorage.setItem("key", JSON.stringify(copy));
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
