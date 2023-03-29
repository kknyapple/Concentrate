import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { subjectDataState } from "../../recoil/concentrate";
import StopWatchComponent from "./StopWatch/StopWatchComponent";
import RecordComponent from "./Record/RecordComponent";
import TotalTimeComponent from "./TotalTimeComponent";
import AddSubjectComponent from "./AddSubjectComponent";
import DayRecordComponent from "./Record/DayRecordComponent";
import SubjectRecordComponent from "./Record/SubjectRecordComponent";
import { Subject } from "types/types";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
`;

const MainComponent = () => {
  const [subjectData, setSubjectData] = useRecoilState(subjectDataState);

  return (
    <Main>
      <TotalTimeComponent />
      <AddSubjectComponent />
      {subjectData.map((subject: Subject) => {
        return (
          <StopWatchComponent
            key={subject.name}
            subject={subject}
            setSubjectData={setSubjectData}
          />
        );
      })}
      <RecordComponent />
      <SubjectRecordComponent />
      <DayRecordComponent />
    </Main>
  );
};

export default MainComponent;
