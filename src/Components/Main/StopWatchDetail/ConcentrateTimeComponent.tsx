import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import {
  pauseClicked,
  startCTime,
  pauseCTime,
} from "../../../recoil/concentrate";
import useStopWatch from "../../../Hooks/useStopWatch";

const ConcentrateTime = styled.div`
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

const ConcentrateTimeComponent = () => {
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [currentStartCTime, setCurrentStartCTime] =
    useRecoilState<number>(startCTime);

  const [hour, minute, second] = useStopWatch(!pause, currentStartCTime);

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
