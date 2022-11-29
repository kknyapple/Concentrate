import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { stopWatchStart, studyTimePass } from "../../../recoil/concentrate";

const StopWatchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 80px;
  width: 500px;
`;

const StopWatchTitle = styled.p`
  display: flex;
  margin-left: 30px;
`;

const StopWatchButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 18px;
  height: 50px;
  width: 50px;
  margin-right: 30px;
`;

const StopWatchComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);

  return (
    <StopWatchBox>
      <StopWatchTitle>집중하기</StopWatchTitle>
      <StopWatchButton
        onClick={() => {
          setStart(true);
          setPass(true);
        }}
      >
        시작
      </StopWatchButton>
    </StopWatchBox>
  );
};

export default StopWatchComponent;
