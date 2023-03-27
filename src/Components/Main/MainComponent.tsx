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
`;

const AddSubject = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: whitesmoke;
  font-size: 14px;
  // height: 80px;
  width: 400px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AddMemoButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
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
      <AddSubject>
        <AddMemoButton>+</AddMemoButton>과목 추가하기
      </AddSubject>
      <RecordComponent />
    </Main>
  );
};

export default MainComponent;
