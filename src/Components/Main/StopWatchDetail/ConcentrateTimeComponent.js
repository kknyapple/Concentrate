import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import {
  pauseClicked,
  startCTime,
  pauseCTime,
} from "../../../recoil/concentrate";

const ConcentrateTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const Title = styled.p``;
const Time = styled.p``;

const ConcentrateTimeComponent = () => {
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [currentStartCTime, setCurrentStartCTime] = useRecoilState(startCTime);
  const [currentPauseCTime, setCurrentPauseCTime] = useRecoilState(pauseCTime);

  const startConcentrateTime = () => {
    const now = new Date(Date.now() - currentStartCTime);

    setSecond(now.getUTCSeconds());
    setMinute(now.getUTCMinutes());
    setHour(now.getUTCHours());
  };

  useEffect(() => {
    if (pause === false) {
      let timerId = setTimeout(() => {
        startConcentrateTime();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [pause, second]);

  return (
    <ConcentrateTime>
      <Title>집중시간</Title>
      <Time>
        {" "}
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:${String(second).padStart(2, "0")}`}
      </Time>
    </ConcentrateTime>
  );
};

export default ConcentrateTimeComponent;
