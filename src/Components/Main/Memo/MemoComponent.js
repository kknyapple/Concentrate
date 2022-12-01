import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import { studyMemo } from "../../../recoil/concentrate";
import MemoItemComponent from "./MemoItemComponent";

const MemoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddMemoButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 10px;
  height: 25px;
  width: 25px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  height: 25px;
`;

const MemoComponent = () => {
  const [memoList, setMemoList] = useRecoilState(studyMemo);
  const [content, setContent] = useState(null);
  const [add, setAdd] = useState(false);

  let newID = function () {
    return Math.random().toString(36).substr(2, 16);
  };

  return (
    <MemoBox>
      {memoList &&
        memoList.map((memo) => {
          return <MemoItemComponent key={memo.id} memo={memo} />;
        })}
      {add === true ? (
        <InputBox>
          <input
            onChange={(e) => {
              setContent({ id: newID(), title: e.target.value });
            }}
          />
          <InputButton
            onClick={() => {
              let copy = [...memoList];
              copy.push(content);
              localStorage.setItem("memo", JSON.stringify(copy));

              setMemoList(copy);
              setAdd(false);
            }}
          >
            확인
          </InputButton>
        </InputBox>
      ) : null}
      <AddMemoButton
        onClick={() => {
          setAdd(!add);
        }}
      >
        +
      </AddMemoButton>
    </MemoBox>
  );
};

export default MemoComponent;
