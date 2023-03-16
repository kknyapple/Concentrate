import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import { studyMemo } from "../../../recoil/concentrate";

const MemoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #50577a;
  color: whitesmoke;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 8px;
  font-size: 8px;
  height: 26px;
  width: 84px;
  margin-bottom: 8px;
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
