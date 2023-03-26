import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { stopWatchStart, subjectDataState } from "../../recoil/concentrate";
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
  const [subjectData, setSubjectData] = useRecoilState(subjectDataState);
  return (
    <Main>
      <TotalTimeComponent />
      <MemoComponent />
      {subjectData.map((subject) => {
        return (
          <StopWatchComponent
            key={subject.name}
            subject={subject}
            setSubjectData={setSubjectData}
          />
        );
      })}
      <RecordComponent />
    </Main>
  );
};

export default MainComponent;
