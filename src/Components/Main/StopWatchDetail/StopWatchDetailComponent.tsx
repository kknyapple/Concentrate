import React from "react";
import styled from "styled-components";

import RestTimeComponent from "./RestTimeComponent";
import ConcentrateTimeComponent from "./ConcentrateTimeComponent";
import StopWatchButtonComponent from "./StopWatchButton/StopWatchButtonComponent";

const StopWatchDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #6b728e;
  border-radius: 8px;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 400px;
`;

const StopWatchTime = styled.div`
  display: flex;
  height: 80px;
  padding-bottom: 15px;
`;

const StopWatchDetailComponent = () => {
  return (
    <StopWatchDetailBox>
      <StopWatchTime>
        <RestTimeComponent />
        <ConcentrateTimeComponent />
      </StopWatchTime>
      <StopWatchButtonComponent />
    </StopWatchDetailBox>
  );
};

export default StopWatchDetailComponent;
