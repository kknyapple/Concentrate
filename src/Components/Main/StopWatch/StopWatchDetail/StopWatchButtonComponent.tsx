import React from "react";
import styled from "styled-components";

import StopWatchPauseComponent from "../../Button/PauseComponent";
import StopWatchStopComponent from "../../Button/StopComponent";

const StopWatchButtonBox = styled.div`
  display: flex;
  cursor: pointer;
  height: 50px;

  margin-left: 10px;
  margin-right: 20px;
`;

const StopWatchButtonComponent = () => {
  return (
    <StopWatchButtonBox>
      <StopWatchPauseComponent />
      <StopWatchStopComponent />
    </StopWatchButtonBox>
  );
};

export default StopWatchButtonComponent;
