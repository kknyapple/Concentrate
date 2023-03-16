import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import { studyMemo } from "../../../recoil/concentrate";

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
  cursor: pointer;
`;

const MemoItemComponent = (props) => {
  const { memo } = props;
  const [memoList, setMemoList] = useRecoilState(studyMemo);

  return (
    <React.Fragment>
      <MemoItem
        onClick={() => {
          const cleanMemo = memoList.filter((item) => item.id !== memo.id);
          localStorage.setItem("memo", JSON.stringify(cleanMemo));
          setMemoList(cleanMemo);
        }}
      >
        🔥 {memo.title}
      </MemoItem>
    </React.Fragment>
  );
};

export default MemoItemComponent;
