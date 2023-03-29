import React from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilState } from "recoil";

import { stopWatchStart, selectedState } from "../../../recoil/concentrate";
import StopWatchDetailComponent from "./StopWatchDetail/StopWatchDetailComponent";
import StopWatchTimeComponent from "./StopWatchTimeComponent";
import DeleteSubjectComponent from "./DeleteSubjectComponent";
import StopWatchStartComponent from "./StopWatchStartComponent";

const StopWatchBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 80px;
  width: 400px;
`;

const StopWatchTitle = styled.p`
  display: flex;
  margin: 0px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 18px;
`;

const StopWatchTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
`;

interface Subject {
  name: string;
  savedTime: number;
}

interface Props {
  subject: Subject;
  setSubjectData: SetterOrUpdater<any>;
}

const StopWatchComponent: React.FC<Props> = ({ subject, setSubjectData }) => {
  const [selected, setSelect] = useRecoilState(selectedState);
  const [start, setStart] = useRecoilState(stopWatchStart);

  return (
    <>
      <StopWatchBox>
        <StopWatchTitleBox>
          <StopWatchTitle>{subject.name}</StopWatchTitle>
          <StopWatchTimeComponent
            subject={subject}
            setSubjectData={setSubjectData}
          />
        </StopWatchTitleBox>
        <StopWatchStartComponent
          subject={subject}
          setSubjectData={setSubjectData}
        />
        <DeleteSubjectComponent
          subject={subject}
          setSubjectData={setSubjectData}
        />
      </StopWatchBox>
      {start === true && selected === subject.name ? (
        <StopWatchDetailComponent />
      ) : null}
    </>
  );
};

export default StopWatchComponent;