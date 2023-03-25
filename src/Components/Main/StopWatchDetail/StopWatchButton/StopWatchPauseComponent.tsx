import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  pauseClicked,
  studyTimePass,
  concentrateTimeState,
  resetTimeState,
  timeState,
} from "../../../../recoil/concentrate";

const Pause = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: #f5f5f5;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 50px;
`;

const StopWatchPauseComponent = () => {
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);
  const [resetTime, setResetTime] = useRecoilState(resetTimeState);

  const changeCondition = (pass: boolean, pause: boolean) => {
    setPass(pass);
    setPause(pause);
  };

  const changeStartRTime = () => {
    if (resetTime.start === null) {
      setResetTime({ start: Date.now(), pause: resetTime.pause });
    } else {
      setResetTime({
        start: resetTime.start + Date.now() - resetTime.pause,
        pause: resetTime.pause,
      });
    }
  };

  const pauseOnClickHandler = () => {
    changeCondition(false, true);

    setTime({ start: time.start, pause: Date.now() });

    setConcentrateTime({ start: concentrateTime.start, pause: Date.now() });

    changeStartRTime();
  };

  const continueOnClickHandler = () => {
    changeCondition(true, false);

    setTime({ start: time.start + Date.now() - time.pause, pause: time.pause });
    setConcentrateTime({
      start: concentrateTime.start + Date.now() - concentrateTime.pause,
      pause: concentrateTime.pause,
    });
    setResetTime({ start: resetTime.start, pause: Date.now() });
  };

  return (
    <React.Fragment>
      {pause == false ? (
        <Pause onClick={pauseOnClickHandler}>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C10.2044 0 9.44129 0.316071 8.87868 0.87868C8.31607 1.44129 8 2.20435 8 3V17C8 17.7956 8.31607 18.5587 8.87868 19.1213C9.44129 19.6839 10.2044 20 11 20C11.7956 20 12.5587 19.6839 13.1213 19.1213C13.6839 18.5587 14 17.7956 14 17V3C14 2.20435 13.6839 1.44129 13.1213 0.87868C12.5587 0.316071 11.7956 0 11 0ZM12 17C12 17.2652 11.8946 17.5196 11.7071 17.7071C11.5196 17.8946 11.2652 18 11 18C10.7348 18 10.4804 17.8946 10.2929 17.7071C10.1054 17.5196 10 17.2652 10 17V3C10 2.73478 10.1054 2.48043 10.2929 2.29289C10.4804 2.10536 10.7348 2 11 2C11.2652 2 11.5196 2.10536 11.7071 2.29289C11.8946 2.48043 12 2.73478 12 3V17ZM3 0C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20C3.79565 20 4.55871 19.6839 5.12132 19.1213C5.68393 18.5587 6 17.7956 6 17V3C6 2.20435 5.68393 1.44129 5.12132 0.87868C4.55871 0.316071 3.79565 0 3 0ZM4 17C4 17.2652 3.89464 17.5196 3.70711 17.7071C3.51957 17.8946 3.26522 18 3 18C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2C3.26522 2 3.51957 2.10536 3.70711 2.29289C3.89464 2.48043 4 2.73478 4 3V17Z"
              fill="#F5F5F5"
            />
          </svg>
        </Pause>
      ) : (
        <Continue onClick={continueOnClickHandler}>
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 1.43C12.21 -0.99 6.93 -0.22 3.41 3.08V1.1C3.41 0.44 2.97 0 2.31 0C1.65 0 1.21 0.44 1.21 1.1V6.05C1.21 6.71 1.65 7.15 2.31 7.15H7.26C7.92 7.15 8.36 6.71 8.36 6.05C8.36 5.39 7.92 4.95 7.26 4.95H4.62C6.27 3.19 8.58 2.2 11 2.2C15.84 2.2 19.8 6.16 19.8 11C19.8 15.84 15.84 19.8 11 19.8C6.16 19.8 2.2 15.84 2.2 11C2.2 10.34 1.76 9.9 1.1 9.9C0.44 9.9 0 10.34 0 11C0 17.05 4.95 22 11 22C14.96 22 18.59 19.91 20.57 16.5C23.54 11.22 21.78 4.51 16.5 1.43ZM11 6.6C10.34 6.6 9.9 7.04 9.9 7.7V11C9.9 11.66 10.34 12.1 11 12.1H13.2C13.86 12.1 14.3 11.66 14.3 11C14.3 10.34 13.86 9.9 13.2 9.9H12.1V7.7C12.1 7.04 11.66 6.6 11 6.6Z"
              fill="#F5F5F5"
            />
          </svg>
        </Continue>
      )}
    </React.Fragment>
  );
};

export default StopWatchPauseComponent;
