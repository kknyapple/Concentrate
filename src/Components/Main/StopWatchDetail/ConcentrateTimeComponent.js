import React from "react";
import styled from "styled-components";

const ConcentrateTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const Name = styled.p``;
const Number = styled.p``;

const ConcentrateTimeComponent = () => {
  return (
    <ConcentrateTime>
      <Name>집중시간</Name>
      <Number>00:00:00</Number>
    </ConcentrateTime>
  );
};

export default ConcentrateTimeComponent;
