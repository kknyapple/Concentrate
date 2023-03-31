import React, { memo } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilState } from "recoil";

import {
  concentrateTimeState,
  selectedState,
  stopWatchStart,
  studyTimePass,
  timeState,
} from "recoil/frontend";
import StopWatchButtonComponent from "../StopWatch/StopWatchDetail/StopWatchButtonComponent";
import { Props } from "types/types";

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

const StopWatchStartComponents: React.FC<Props> = memo(
  ({ subject, setSubjectData }) => {
    const [selected, setSelect] = useRecoilState(selectedState);
    const [start, setStart] = useRecoilState(stopWatchStart);
    const [pass, setPass] = useRecoilState(studyTimePass);
    const [time, setTime] = useRecoilState(timeState);
    const [concentrateTime, setConcentrateTime] =
      useRecoilState(concentrateTimeState);

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

    const startStudy = () => {
      setSelect(subject.name);
      setStart(true);
      setPass(true);
      changeStartTime();
      changeStartCTime();
    };

    return (
      <>
        {start === true && selected === subject.name ? (
          <StopWatchButtonComponent />
        ) : start === true && selected !== subject.name ? (
          <IneffectiveButton>시작</IneffectiveButton>
        ) : (
          <StopWatchButton onClick={startStudy}>시작</StopWatchButton>
        )}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.subject.name === nextProps.subject.name
);

export default StopWatchStartComponents;
