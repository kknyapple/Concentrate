import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { stopWatchStart } from "../../recoil/concentrate";
import StopWatchDetailComponent from "./StopWatchDetail/StopWatchDetailComponent";
import StopWatchComponent from "./StopWatch/StopWatchComponent";
import RecordComponent from "./Record/RecordComponent";
import MemoComponent from "./Memo/MemoComponent";
import TotalTimeComponent from "./TotalTimeComponent";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-size: 20px;
`;

const MainComponent = () => {
  const start = useRecoilValue(stopWatchStart);

  return (
    <Main>
      <TotalTimeComponent />
      <MemoComponent />
      <StopWatchComponent />
      {start === true ? <StopWatchDetailComponent /> : null}
      <RecordComponent />
    </Main>
  );
};

export default MainComponent;
