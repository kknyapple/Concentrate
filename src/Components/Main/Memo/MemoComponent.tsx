import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import MemoItemComponent from "./MemoItemComponent";
import { studyMemo } from "recoil/localStorage";

const MemoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  flex-direction: row;
  flex-wrap: wrap;
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
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin-bottom: 8px;
`;

const MemoInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemoInput = styled.input`
  height: 24px;
  width: 80px;
  border: 0;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  background-color: whitesmoke;
  margin-bottom: 8px;
`;

const MemoInputButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  height: 26px;
  width: 35px;
  border: 0;
  outline: 0;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: whitesmoke;
  margin-bottom: 8px;
  cursor: pointer;
`;

interface Memo {
  id: string;
  title: string;
}

const MemoComponent = () => {
  const [memoList, setMemoList] = useRecoilState(studyMemo);
  const [content, setContent] = useState<Memo | null>(null);
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
        <MemoInputBox>
          <MemoInput
            type="text"
            id="memo"
            minLength={1}
            maxLength={5}
            onChange={(e) => {
              setContent({ id: newID(), title: e.target.value });
            }}
          />
          <MemoInputButton
            onClick={() => {
              if (content !== null) {
                let copy = [...memoList];
                copy.push(content);
                localStorage.setItem("memo", JSON.stringify(copy));
                setMemoList(copy);
                setAdd(false);
              }
            }}
          >
            입력
          </MemoInputButton>
        </MemoInputBox>
      ) : null}
      <AddMemoButton
        onClick={() => {
          setAdd(!add);
        }}
      >
        {add ? "x" : "+"}
      </AddMemoButton>
    </MemoBox>
  );
};

export default MemoComponent;
