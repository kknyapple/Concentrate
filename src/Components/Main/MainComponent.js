import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import TimerComponent from "./Timer/TimerComponent";
import { timerStart } from "../../recoil/concentrate";
import CountDownComponent from "./CountDown/CountDownComponent";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-size: 20px;
`;

const StudyTime = styled.div`
  display: flex;
  font-size: 60px;
  margin: 30px;
`;

const MainComponent = () => {
  const start = useRecoilValue(timerStart);

  return (
    <Main>
      <StudyTime>00:00:00</StudyTime>
      {start === true ? <CountDownComponent /> : <TimerComponent />}
    </Main>
  );
};

export default MainComponent;
