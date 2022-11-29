import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { stopWatchStart, timePass } from "../../../recoil/concentrate";

const Timer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 80px;
  width: 500px;
`;

const TimerInfo = styled.p`
  display: flex;
  margin-left: 30px;
`;

const TimerButton = styled.button`
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

const TimerItemComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(timePass);

  return (
    <Timer>
      <TimerInfo>집중하기</TimerInfo>
      <TimerButton
        onClick={() => {
          setStart(true);
          setPass(true);
        }}
      >
        시작
      </TimerButton>
    </Timer>
  );
};

export default TimerItemComponent;
