import React from "react";
import { useState } from "react";
import styled from "styled-components";

const MemoItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #50577a;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
  font-size: 8px;
  height: 25px;
  width: 84px;
`;

const MemoItemComponent = (props) => {
  const { memo } = props;

  return (
    <React.Fragment>
      <MemoItem>🔥 {memo.title}</MemoItem>
    </React.Fragment>
  );
};

export default MemoItemComponent;
