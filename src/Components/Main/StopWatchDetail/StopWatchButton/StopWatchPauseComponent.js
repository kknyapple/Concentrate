import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { pauseClicked, studyTimePass } from "../../../../recoil/concentrate";

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

const StopWatchPauseComponent = () => {
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);

  const pauseOnClickHandler = () => {
    setPause(true);
    setPass(false);
  };

  const continueOnClickHandler = () => {
    setPause(false);
    setPass(true);
  };

  return (
    <React.Fragment>
      {pause == false ? (
        <Pause onClick={pauseOnClickHandler}>●</Pause>
      ) : (
        <Continue onClick={continueOnClickHandler}>▶</Continue>
      )}
    </React.Fragment>
  );
};

export default StopWatchPauseComponent;
