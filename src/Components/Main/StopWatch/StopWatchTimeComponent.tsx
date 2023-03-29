import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  concentrateTimeState,
  timeState,
  selectedState,
  subjectDataState,
  todayDate,
} from "../../../recoil/concentrate";
import useStopWatch from "Hooks/useStopWatch";
import { Props, Subject } from "types/types";

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
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");

  useEffect(() => {
    setCurrentTime(
      Date.now() - concentrateTime.start + 1000 + subject.savedTime
    ); // 왜 +1을 해야할까?
    setFirst(subject.savedTime);
  }, [start]);

  useEffect(() => {
    if (subject.name === selected && start) {
      setCurrentTime(Date.now() - concentrateTime.start + first + 1000); // 왜 +1을 해야할까?

      const index = subjectData.findIndex(
        (item: Subject) => item.name === subject.name
      );
      const updatedSubject = {
        ...subjectData[index],
        savedTime: currentTime,
      };
      const newSubjectData = [
        ...subjectData.slice(0, index),
        updatedSubject,
        ...subjectData.slice(index + 1),
      ];
      setSubjectData(newSubjectData);
      localStorage.setItem("subject", JSON.stringify(newSubjectData));
      // console.log(currentTime);
    }
  }, [second]);

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

  useEffect(() => {
    setToday(`${year}-${month}-${day}`);

    if (localStorage.getItem("key")) {
      let length = JSON.parse(localStorage.getItem("key") as string).length;
      let lastStudy = JSON.parse(localStorage.getItem("key") as string)[
        length - 1
      ].day;
      let today = `${year}-${month}-${day}`;
      if (lastStudy !== today) {
        reset();
      }
    }
  }, []);

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
