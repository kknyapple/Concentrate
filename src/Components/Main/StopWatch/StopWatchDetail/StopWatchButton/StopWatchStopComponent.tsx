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
  todayDate,
  concentrateTimeState,
  restTimeState,
  timeState,
} from "../../../../../recoil/concentrate";
import saveStudyTimeToLocal from "utils/saveStudyTimeToLocal";
import {
  filterTimeData,
  saveStudyDataToLocal,
  updateStudyData,
} from "utils/saveStudyDataToLocal";

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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IneffectiveStop = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e687d;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 18px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 50px;
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
  let convertTime = Number(hour + minute / 60 + second / 3600).toFixed(3);

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);
  const [resetTime, setResetTime] = useRecoilState(restTimeState);

  const changeCondition = (pass: boolean, start: boolean, pause: boolean) => {
    setPass(pass);
    setStart(start);
    setPause(pause);
  };

  interface StudyData {
    value: string;
    day: string;
  }

  let cleanTimeData: StudyData[] = filterTimeData(timeData, today);
  let updatedStudyData: StudyData[] = updateStudyData(
    cleanTimeData,
    convertTime,
    today
  );

  const stopOnClickHandler = () => {
    changeCondition(false, false, false);

    saveStudyDataToLocal(updatedStudyData);
    saveStudyTimeToLocal(hour, minute, second);

    setTime({ start: time.start, pause: Date.now() });
    setConcentrateTime({ start: 0, pause: 0 });
    setResetTime({ start: 0, pause: 0 });
  };

  return (
    <React.Fragment>
      {pass ? (
        <Stop onClick={stopOnClickHandler}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 0H5C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5V15C0 16.3261 0.526784 17.5979 1.46447 18.5355C2.40215 19.4732 3.67392 20 5 20H15C16.3261 20 17.5979 19.4732 18.5355 18.5355C19.4732 17.5979 20 16.3261 20 15V5C20 3.67392 19.4732 2.40215 18.5355 1.46447C17.5979 0.526784 16.3261 0 15 0ZM18 15C18 15.7956 17.6839 16.5587 17.1213 17.1213C16.5587 17.6839 15.7956 18 15 18H5C4.20435 18 3.44129 17.6839 2.87868 17.1213C2.31607 16.5587 2 15.7956 2 15V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H15C15.7956 2 16.5587 2.31607 17.1213 2.87868C17.6839 3.44129 18 4.20435 18 5V15Z"
              fill="#F5F5F5"
            />
          </svg>
        </Stop>
      ) : (
        <IneffectiveStop>
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 0H5C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5V15C0 16.3261 0.526784 17.5979 1.46447 18.5355C2.40215 19.4732 3.67392 20 5 20H15C16.3261 20 17.5979 19.4732 18.5355 18.5355C19.4732 17.5979 20 16.3261 20 15V5C20 3.67392 19.4732 2.40215 18.5355 1.46447C17.5979 0.526784 16.3261 0 15 0ZM18 15C18 15.7956 17.6839 16.5587 17.1213 17.1213C16.5587 17.6839 15.7956 18 15 18H5C4.20435 18 3.44129 17.6839 2.87868 17.1213C2.31607 16.5587 2 15.7956 2 15V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H15C15.7956 2 16.5587 2.31607 17.1213 2.87868C17.6839 3.44129 18 4.20435 18 5V15Z"
              fill="#9c9c9c"
            />
          </svg>
        </IneffectiveStop>
      )}
    </React.Fragment>
  );
};

export default StopWatchStopComponent;
