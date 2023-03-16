import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import {
  pauseClicked,
  startRTime,
  pauseRTime,
} from "../../../recoil/concentrate";
import useSetTime from "../../../Hooks/useSetTime";

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  height: 100px;
`;

const Title = styled.div`
  height: 40px;
`;
const Time = styled.div`
  height: 40px;
`;

const RestTimeComponent = () => {
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [currentStartRTime, setCurrentStartRTime] = useRecoilState(startRTime);
  const [currentPauseRTime, setCurrentPauseRTime] = useRecoilState(pauseRTime);

  const [hour, minute, second] = useSetTime(pause, currentStartRTime);

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
