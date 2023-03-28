import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  stopWatchStart,
  studyTimePass,
  concentrateTimeState,
  timeState,
  pauseClicked,
  selectedState,
  subjectDataState,
  todayDate,
  restTimeState,
} from "../../../recoil/concentrate";
import StopWatchButtonComponent from "../StopWatchDetail/StopWatchButton/StopWatchButtonComponent";
import useStopWatch from "Hooks/useStopWatch";
import StopWatchDetailComponent from "../StopWatchDetail/StopWatchDetailComponent";

const StopWatchBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #6b728e;
  border-radius: 8px;
  height: 80px;
  width: 400px;
`;

const StopWatchTitle = styled.p`
  display: flex;
  margin: 0px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 18px;
`;

const StopWatchTime = styled.p`
  display: flex;
  margin: 0px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 14px;
`;

const StopWatchButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e68;
  color: whitesmoke;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 50%;
  font-size: 14px;
  height: 50px;
  width: 50px;
  // width: 50px;
  cursor: pointer;
`;

const IneffectiveButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #474e687d;
  color: #9c9c9c;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 50%;
  font-size: 14px;
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

const StopWatchTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
`;
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

const StopWatchComponent = (props) => {
  let subject = props.subject;
  let setSubjectData = props.setSubjectData;

  const subjectData = useRecoilValue(subjectDataState);
  const [selected, setSelect] = useRecoilState(selectedState);

  const [start, setStart] = useRecoilState(stopWatchStart);
  const [pass, setPass] = useRecoilState(studyTimePass);
  const [pause, setPause] = useRecoilState(pauseClicked);

  const [time, setTime] = useRecoilState(timeState);
  const [concentrateTime, setConcentrateTime] =
    useRecoilState(concentrateTimeState);
  const [restTime, setRestTime] = useRecoilState(restTimeState);

  const [hour, minute, second] = useStopWatch(
    pass && selected === subject.name,
    concentrateTime.start - subject.savedTime
  );

  const [currentTime, setCurrentTime] = useState(subject.savedTime);
  const [first, setFirst] = useState(subject.savedTime);

  useEffect(() => {
    setCurrentTime(
      Date.now() - concentrateTime.start + 1000 + subject.savedTime
    ); // 왜 +1을 해야할까?
    setFirst(subject.savedTime);
  }, [start]);

  useEffect(() => {
    if (subject.name === selected && start) {
      setCurrentTime(Date.now() - concentrateTime.start + first + 1000); // 왜 +1을 해야할까?

      const index = subjectData.findIndex((item) => item.name === subject.name);
      const updatedSubject = {
        ...subjectData[index],
        savedTime: currentTime,
      };
      const newSubjectData = [
        ...subjectData.slice(0, index),
        updatedSubject,
        ...subjectData.slice(index + 1),
      ];
      setSubjectData(newSubjectData);
      localStorage.setItem("subject", JSON.stringify(newSubjectData));
      // console.log(currentTime);
    }
  }, [second]);

  /* useEffect(() => {
    let intervalId = null;

    if (subject.name === selected && start) {
      intervalId = setInterval(() => {
        let cleanSubject = subjectData.filter(
          (item) => item.name !== subject.name
        );
        setSubjectData([
          {
            name: subject.name,
            savedTime: currentTime,
          },
          ...cleanSubject,
        ]);
        // console.log(currentTime);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [start]);*/

  const reset = () => {
    const index = subjectData.findIndex((item) => item.name === subject.name);
    const updatedSubject = {
      ...subjectData[index],
      savedTime: 0,
    };
    const newSubjectData = [
      ...subjectData.slice(0, index),
      updatedSubject,
      ...subjectData.slice(index + 1),
    ];
    setSubjectData(newSubjectData);
    localStorage.setItem("subject", JSON.stringify(newSubjectData));
  };

  const [today, setToday] = useRecoilState<string>(todayDate);
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");

  useEffect(() => {
    setToday(`${year}-${month}-${day}`);

    if (localStorage.getItem("subject")) {
      let length = JSON.parse(localStorage.getItem("key") as string).length;
      let lastStudy = JSON.parse(localStorage.getItem("key") as string)[
        length - 1
      ].day;
      let today = `${year}-${month}-${day}`;
      if (lastStudy !== today) {
        reset();
      }
    }
  }, []);

  const changeStartTime = () => {
    if (time.start === null) {
      setTime({ start: Date.now(), pause: time.pause });
    } else {
      setTime({
        start: time.start + Date.now() - time.pause,
        pause: time.pause,
      });
    }
  };

  const changeStartCTime = () => {
    if (concentrateTime.start === null) {
      setConcentrateTime({ start: Date.now(), pause: concentrateTime.pause });
    } else {
      setConcentrateTime({
        start: concentrateTime.start + Date.now() - concentrateTime.pause,
        pause: concentrateTime.pause,
      });
    }
  };

  return (
    <>
      <StopWatchBox>
        <StopWatchTitleBox>
          <StopWatchTitle>{subject.name}</StopWatchTitle>
          <StopWatchTime>
            {`${String(
              // hour
              parseInt(subject.savedTime / 1000 / 3600)
            ).padStart(2, "0")}:${String(
              // minute
              parseInt(((subject.savedTime / 1000) % 3600) / 60)
            ).padStart(2, "0")}:${String(
              parseInt((subject.savedTime / 1000) % 60)
              //second
            ).padStart(2, "0")}`}
          </StopWatchTime>
        </StopWatchTitleBox>

        {start === true && selected === subject.name ? (
          <StopWatchButtonComponent />
        ) : start === true && selected !== subject.name ? (
          <IneffectiveButton>시작</IneffectiveButton>
        ) : (
          <StopWatchButton
            onClick={() => {
              setSelect(subject.name);
              setStart(true);
              setPass(true);
              changeStartTime();
              changeStartCTime();
            }}
          >
            시작
          </StopWatchButton>
        )}
        {!start ? (
          <DeleteButtonBox>
            <DeleteButton
              onClick={() => {
                if (
                  window.confirm(
                    `'${subject.name}' 을(를) 삭제하시겠습니까? 총 시간은 유지됩니다.`
                  )
                ) {
                  const cleanMemo = subjectData.filter(
                    (item) => item.name !== subject.name
                  );
                  localStorage.setItem("subject", JSON.stringify(cleanMemo));
                  setSubjectData(cleanMemo);
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
      </StopWatchBox>
      {start === true && selected === subject.name ? (
        <StopWatchDetailComponent />
      ) : null}
    </>
  );
};

export default StopWatchComponent;
