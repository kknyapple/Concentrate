import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { studyMemo } from "recoil/localStorage";

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

interface Memo {
  id: string;
  title: string;
}

const MemoItemComponent = ({ memo }: { memo: Memo }) => {
  const [memoList, setMemoList] = useRecoilState<Memo[]>(studyMemo);

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
