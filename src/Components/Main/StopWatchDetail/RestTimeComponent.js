import React from "react";
import styled from "styled-components";

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const Name = styled.p``;
const Number = styled.p``;

const RestTimeComponent = () => {
  return (
    <RestTime>
      <Name>쉬는시간</Name>
      <Number>00:00:00</Number>
    </RestTime>
  );
};

export default RestTimeComponent;
