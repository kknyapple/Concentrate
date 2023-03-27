import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  pauseClicked,
  studyTimePass,
  concentrateTimeState,
  restTimeState,
  timeState,
  stopWatchStart,
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
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);
  const [resetTime, setResetTime] = useRecoilState(restTimeState);

  const changeCondition = (pass: boolean, start: boolean, pause: boolean) => {
    setPass(pass);
    setStart(start);
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
    changeCondition(false, true, true);

    setTime({ start: time.start, pause: Date.now() });

    setConcentrateTime({ start: concentrateTime.start, pause: Date.now() });

    changeStartRTime();
  };

  const continueOnClickHandler = () => {
    changeCondition(true, true, false);

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
            width="10"
            height="15"
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
            width="14"
            height="15"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.4351 6.66542L5.70077 0.509289C5.11992 0.173879 4.46065 -0.00182794 3.78992 1.43393e-05C3.11918 0.00185662 2.46089 0.181182 1.88189 0.519778C1.30289 0.858373 0.82382 1.34418 0.493334 1.92784C0.162849 2.51151 -0.0072762 3.17224 0.00023859 3.84293V16.1996C0.00023859 17.2076 0.400632 18.1742 1.11334 18.8869C1.82604 19.5996 2.79268 20 3.80059 20C4.46781 19.9989 5.12304 19.8226 5.70077 19.4888L16.4351 13.3327C17.0119 12.9989 17.4908 12.5193 17.8237 11.942C18.1566 11.3646 18.3318 10.7099 18.3318 10.0435C18.3318 9.37709 18.1566 8.72239 17.8237 8.14507C17.4908 7.56776 17.0119 7.08814 16.4351 6.75432V6.66542ZM15.3239 11.3214L4.58956 17.5664C4.34896 17.7028 4.07714 17.7745 3.80059 17.7745C3.52405 17.7745 3.25222 17.7028 3.01163 17.5664C2.77172 17.4279 2.5725 17.2287 2.434 16.9888C2.29551 16.7488 2.22262 16.4767 2.22267 16.1996V3.79849C2.22262 3.52146 2.29551 3.2493 2.434 3.00937C2.5725 2.76944 2.77172 2.57021 3.01163 2.43169C3.25322 2.29741 3.52423 2.22488 3.80059 2.22056C4.07677 2.22623 4.34746 2.29867 4.58956 2.43169L15.3239 8.63227C15.5639 8.77073 15.7632 8.96994 15.9018 9.20987C16.0404 9.4498 16.1133 9.72199 16.1133 9.99906C16.1133 10.2761 16.0404 10.5483 15.9018 10.7883C15.7632 11.0282 15.5639 11.2274 15.3239 11.3659V11.3214Z"
              fill="#F5F5F5"
            />
          </svg>
        </Continue>
      )}
    </React.Fragment>
  );
};

export default StopWatchPauseComponent;
