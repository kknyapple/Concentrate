import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import {
  pauseClicked,
  startRTime,
  pauseRTime,
} from "../../../recoil/concentrate";
import useStopWatch from "../../../Hooks/useStopWatch";

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

  const [hour, minute, second] = useStopWatch(pause, currentStartRTime);

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
