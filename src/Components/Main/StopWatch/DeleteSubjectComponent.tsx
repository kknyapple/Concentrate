import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { stopWatchStart, subjectDataState } from "../../../recoil/concentrate";

const DeleteButtonBox = styled.div`
  position: absolute;
  right: 8px;
  top: 4px;
`;

const DeleteButton = styled.div`
  opacity: 0;
  ${DeleteButtonBox}:hover & {
    opacity: 1;
  }
  cursor: pointer;
  font-size: 16px;
  color: #f5f5f5;
`;

interface Subject {
  name: string;
  savedTime: number;
}

const DeleteSubjectComponent = (props) => {
  let subject = props.subject;
  let setSubjectData = props.setSubjectData;

  const subjectData = useRecoilValue(subjectDataState);
  const [start, setStart] = useRecoilState(stopWatchStart);

  return (
    <>
      {!start ? (
        <DeleteButtonBox>
          <DeleteButton
            onClick={() => {
              if (
                window.confirm(
                  `'${subject.name}' 을(를) 삭제하시겠습니까? 총 시간은 유지됩니다.`
                )
              ) {
                const cleanedSubject = subjectData.filter(
                  (item: Subject) => item.name !== subject.name
                );
                localStorage.setItem("subject", JSON.stringify(cleanedSubject));
                setSubjectData(cleanedSubject);
              }
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#F5F5F5"
              />
            </svg>
          </DeleteButton>
        </DeleteButtonBox>
      ) : null}
    </>
  );
};

export default DeleteSubjectComponent;
