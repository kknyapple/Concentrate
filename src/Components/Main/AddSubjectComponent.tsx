import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { stopWatchStart } from "recoil/frontend";
import { Subject } from "types/types";
import { subjectDataState } from "recoil/localStorage";

const AddSubject = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: whitesmoke;
  font-size: 14px;
  width: 400px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.div`
  position: relative;
  display: inline-block;
`;

const AddSubjectButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: whitesmoke;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  cursor: pointer;

  top: 0;
  right: 0;
  bottom: 0;
`;

const MemoInput = styled.input`
  height: 22px;
  width: 100px;
  border: 0;
  ::placeholder {
    color: #9c9c9c;
  }
  padding-right: 30px;
  outline: none;
  border-bottom: #9c9c9c 0.8px solid;
  &:focus {
    border-bottom-color: whitesmoke;
  }
  padding-left: 5px;
  background-color: transparent;
  color: whitesmoke;
  font-size: 11px;
`;

const AddSubjectComponent = () => {
  const [start, setStart] = useRecoilState(stopWatchStart);
  const [subjectData, setSubjectData] = useRecoilState(subjectDataState);
  const [content, setContent] = useState({ name: "", savedTime: 0 });

  return (
    <AddSubject>
      <Input>
        <MemoInput
          type="text"
          id="subject"
          minLength={1}
          maxLength={10}
          placeholder="과목을 추가해주세요"
          value={content.name}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              if (
                subjectData.some((item: Subject) => item.name === content.name)
              ) {
                alert("동일한 과목 명은 추가가 불가합니다.");
                return;
              }
              if (content.name !== "") {
                let copy = [...subjectData];
                copy.push(content);
                localStorage.setItem("subject", JSON.stringify(copy));
                setSubjectData(copy);
                setContent({ name: "", savedTime: 0 });
              }
            }
          }}
          onChange={(e) => {
            if (!start) {
              setContent({ name: e.target.value, savedTime: 0 });
            }
          }}
        />

        <AddSubjectButton
          onClick={() => {
            if (content.name !== "") {
              let copy = [...subjectData];
              copy.push(content);
              localStorage.setItem("subject", JSON.stringify(copy));
              setSubjectData(copy);
              setContent({ name: "", savedTime: 0 });
            }
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              fill="#F5F5F5"
            />
          </svg>
        </AddSubjectButton>
      </Input>
    </AddSubject>
  );
};

export default AddSubjectComponent;
