import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import {
  pauseClicked,
  startRTime,
  pauseRTime,
} from "../../../recoil/concentrate";

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const Title = styled.p``;
const Time = styled.p``;

const RestTimeComponent = () => {
  const [pause, setPause] = useRecoilState(pauseClicked);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [currentStartRTime, setCurrentStartRTime] = useRecoilState(startRTime);
  const [currentPauseRTime, setCurrentPauseRTime] = useRecoilState(pauseRTime);

  const startRestTime = () => {
    const now = new Date(Date.now() - currentStartRTime);

    setSecond(now.getUTCSeconds());
    setMinute(now.getUTCMinutes());
    setHour(now.getUTCHours());
  };

  useEffect(() => {
    if (pause === true) {
      startRestTime();
      let timerId = setTimeout(() => {
        startRestTime();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [pause, second]);

  return (
    <RestTime>
      <Title>쉬는시간</Title>
      <Time>
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:${String(second).padStart(2, "0")}`}
      </Time>
    </RestTime>
  );
};

export default RestTimeComponent;
