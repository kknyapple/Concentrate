import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import {
  pauseClicked,
  startCTime,
  pauseCTime,
} from "../../../recoil/concentrate";
import useSetTime from "../../../Hooks/useSetTime";

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

  const [currentStartCTime, setCurrentStartCTime] = useRecoilState(startCTime);
  const [currentPauseCTime, setCurrentPauseCTime] = useRecoilState(pauseCTime);

  const [hour, minute, second] = useSetTime(!pause, currentStartCTime);

  return (
    <ConcentrateTime>
      <Title>집중시간</Title>
      <Time>
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:${String(second).padStart(2, "0")}`}
      </Time>
    </ConcentrateTime>
  );
};

export default ConcentrateTimeComponent;
