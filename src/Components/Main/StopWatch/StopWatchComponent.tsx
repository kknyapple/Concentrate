import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  concentrateTimeState,
  timeState,
  pauseClicked,
  selectedState,
  subjectDataState,
} from "../../../recoil/concentrate";
import StopWatchButtonComponent from "../StopWatchDetail/StopWatchButton/StopWatchButtonComponent";
import useStopWatch from "Hooks/useStopWatch";
import StopWatchDetailComponent from "../StopWatchDetail/StopWatchDetailComponent";

const StopWatchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 80px;
  width: 400px;
`;

const StopWatchTitle = styled.p`
  display: flex;
  margin: 0px;
  margin-left: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 18px;
`;

const StopWatchTime = styled.p`
  display: flex;
  margin: 0px;
  margin-left: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 14px;
`;

const StopWatchButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 50%;
  font-size: 14px;
  height: 50px;
  width: 50px;
  // width: 50px;
  cursor: pointer;
`;

const IneffectiveButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e687d;
  color: #9c9c9c;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 50%;
  font-size: 14px;
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

const StopWatchTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
`;

const StopWatchComponent = (props) => {
  let subject = props.subject;
  let setSubjectData = props.setSubjectData;

  const subjectData = useRecoilValue(subjectDataState);
  const [selected, setSelect] = useRecoilState(selectedState);

  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);

  const [hour, minute, second] = useStopWatch(
    pass && selected === subject.name,
    concentrateTime.start - subject.savedTime
  );

  useEffect(() => {
    if (subject.name === selected) {
      const cleanSubject = subjectData.filter(
        (item) => item.name !== subject.name
      );
      setSubjectData([
        {
          name: subject.name,
          savedTime: second * 1000 + minute * 1000 * 60 + hour * 1000 * 60 * 60,
        },
        ...cleanSubject,
      ]);
    }
  }, [start]);

  const changeStartTime = () => {
    if (time.start === null) {
      setTime({ start: Date.now(), pause: time.pause });
    } else {
      setTime({
        start: time.start + Date.now() - time.pause,
        pause: time.pause,
      });
    }
  };

  const changeStartCTime = () => {
    if (concentrateTime.start === null) {
      setConcentrateTime({ start: Date.now(), pause: concentrateTime.pause });
    } else {
      setConcentrateTime({
        start: concentrateTime.start + Date.now() - concentrateTime.pause,
        pause: concentrateTime.pause,
      });
    }
  };

  return (
    <>
      <StopWatchBox>
        <StopWatchTitleBox>
          <StopWatchTitle>{subject.name}</StopWatchTitle>
          <StopWatchTime>
            {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}:${String(second).padStart(2, "0")}`}
          </StopWatchTime>
        </StopWatchTitleBox>

        {start === true && selected === subject.name ? (
          <StopWatchButtonComponent />
        ) : start === true && selected !== subject.name ? (
          <IneffectiveButton>시작</IneffectiveButton>
        ) : (
          <StopWatchButton
            onClick={() => {
              setSelect(subject.name);
              setStart(true);
              setPass(true);
              changeStartTime();
              changeStartCTime();
            }}
          >
            시작
          </StopWatchButton>
        )}
      </StopWatchBox>
      {start === true && selected === subject.name ? (
        <StopWatchDetailComponent />
      ) : null}
    </>
  );
};

export default StopWatchComponent;
