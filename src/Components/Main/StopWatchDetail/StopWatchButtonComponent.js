import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { stopWatchStart, timePass } from "../../../recoil/concentrate";

const Pause = styled.button`
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
`;
const Continue = styled.button`
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
`;
const Stop = styled.button`
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
`;

const StopWatchButtonBox = styled.div`
  display: flex;
  padding-top: 15px;
`;

const StopWatchButtonComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(timePass);
  const [pause, setPause] = useState(false);

  return (
    <StopWatchButtonBox>
      {pause == false ? (
        <Pause
          onClick={() => {
            setPause(true);
            setPass(false);
          }}
        >
          ●
        </Pause>
      ) : (
        <Continue
          onClick={() => {
            setPause(false);
            setPass(true);
          }}
        >
          ▶
        </Continue>
      )}
      <Stop
        onClick={() => {
          setPass(false);
          setStart(false);
        }}
      >
        ■
      </Stop>
    </StopWatchButtonBox>
  );
};

export default StopWatchButtonComponent;
