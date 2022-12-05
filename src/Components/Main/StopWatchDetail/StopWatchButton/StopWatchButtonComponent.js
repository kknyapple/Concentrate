import React from "react";
import styled from "styled-components";

import StopWatchPauseComponent from "./StopWatchPauseComponent";
import StopWatchStopComponent from "./StopWatchStopComponent";

const StopWatchButtonBox = styled.div`
  display: flex;
  padding-top: 15px;
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
