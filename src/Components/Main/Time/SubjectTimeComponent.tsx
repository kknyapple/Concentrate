import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  concentrateTimeState,
  selectedState,
  todayDate,
} from "../../../recoil/frontend";
import useStopWatch from "Hooks/useStopWatch";
import { Props, Subject } from "types/types";
import { subjectDataState } from "recoil/localStorage";

const StopWatchTime = styled.p`
  display: flex;
  margin: 0px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 14px;
`;

const StopWatchTimeComponent: React.FC<Props> = ({
  subject,
  setSubjectData,
}) => {
  const subjectData = useRecoilValue(subjectDataState);
  const [selected, setSelect] = useRecoilState(selectedState);
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);
  const [hour, minute, second] = useStopWatch(
    pass && selected === subject.name,
    concentrateTime.start - subject.savedTime
  );
  const [currentTime, setCurrentTime] = useState(subject.savedTime);
  const [first, setFirst] = useState(subject.savedTime);

  const [today, setToday] = useRecoilState<string>(todayDate);

  useEffect(() => {
    if (subject.name === selected && pass && start) {
      let timerId = setInterval(() => {
        const newCurrentTime = Date.now() - concentrateTime.start + first;
        setCurrentTime(newCurrentTime);
        const index = subjectData.findIndex(
          (item: Subject) => item.name === subject.name
        );
        const updatedSubject = {
          ...subjectData[index],
          savedTime: newCurrentTime,
        };
        const newSubjectData = [
          ...subjectData.slice(0, index),
          updatedSubject,
          ...subjectData.slice(index + 1),
        ];
        setSubjectData(newSubjectData);
        localStorage.setItem("subject", JSON.stringify(newSubjectData));
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [pass]);

  const reset = () => {
    const newSubjectData = subjectData.map((item: Subject) => {
      return {
        name: item.name,
        savedTime: 0,
      };
    });

    setSubjectData(newSubjectData);
    localStorage.setItem("subject", JSON.stringify(newSubjectData));
  };

  const setCurrentDate = () => {
    const dateObj = new Date();
    const currentHour = dateObj.getHours();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    if (currentHour < 6) {
      dateObj.setDate(dateObj.getDate() - 1);
      return `${dateObj.getFullYear()}-${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
    }

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setToday(setCurrentDate());

    if (localStorage.getItem("key")) {
      let length = JSON.parse(localStorage.getItem("key") as string).length;
      let lastStudy = JSON.parse(localStorage.getItem("key") as string)[
        length - 1
      ].day;
      let today = setCurrentDate();

      if (lastStudy !== today) {
        reset();
      }
    }
  }, []);

  window.addEventListener("beforeunload", setCurrentDate);

  return (
    <StopWatchTime>
      {`${String(
        // hour
        parseInt(subject.savedTime / 1000 / 3600)
      ).padStart(2, "0")}:${String(
        // minute
        parseInt(((subject.savedTime / 1000) % 3600) / 60)
      ).padStart(2, "0")}:${String(
        parseInt((subject.savedTime / 1000) % 60)
        // second
      ).padStart(2, "0")}`}
    </StopWatchTime>
  );
};

export default StopWatchTimeComponent;
