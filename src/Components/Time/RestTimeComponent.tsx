import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { pauseClicked, restTimeState } from "../../recoil/frontend";
import useStopWatch from "../../Hooks/useStopWatch";

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 40px;
  padding-right: 40px;
  height: 140px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 18px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 18px;
`;

const RestTimeComponent = () => {
  const [pause, setPause] = useRecoilState(pauseClicked);
  const [resetTime, setResetTime] = useRecoilState(restTimeState);
  const [hour, minute, second] = useStopWatch(pause, resetTime.start);

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
