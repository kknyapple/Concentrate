import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { concentrateTimeState, studyTimePass } from "../../../recoil/frontend";
import useStopWatch from "../../../Hooks/useStopWatch";

const ConcentrateTime = styled.div`
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

const ConcentrateTimeComponent = () => {
  const [pass, setPass] = useRecoilState(studyTimePass);

  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);

  const [hour, minute, second] = useStopWatch(pass, concentrateTime.start);

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
