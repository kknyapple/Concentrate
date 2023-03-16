# Concentrate-StopWatch

## 목차
[1. 프로젝트 소개](#프로젝트-소개)

[2. 사용 예제](#사용-예제)
- 공부 시간 측정
- 집중 시간, 쉬는 시간 측정
- 간단한 메모 작성
- 총 공부 시간 기록

[3. Issue](#issue)
- [새로고침 후에도 총 시간](#1.-새로고침-후-총-시간-누적하기(11/29))
- [스톱워치 시간이 느리게 가는 현상](#7.-스톱워치-시간이-느리게-가는-현상(12/5---12/9))
- [useSetTime custom hook](#12.-usesetime-hook-제작(3/16))

## ✨프로젝트 소개

> 공부 시간 측정을 위한 스톱워치

하루 단위로 총 공부 시간을 측정해줍니다. 캘린더에 날짜와 함께 공부 시간 정도에 따른 색깔과 공부 시간을 표시해 줍니다.

## 📄사용 예제

### 1️. 공부 시간 측정

![시간측정](https://user-images.githubusercontent.com/72698829/225727451-3735a8e0-3ead-4269-9a87-b99ab5dbab18.gif)
시작 버튼을 누르면 시간 측정이 시작됩니다.

### 2️. 집중 시간, 쉬는 시간 측정

![쉬는시간](https://user-images.githubusercontent.com/72698829/225727665-39ad02b0-2657-4188-ac7e-38348025938b.gif)
일시정지 버튼과 다시 시작 버튼으로 집중 시간과 쉬는 시간을 측정할 수 있습니다.

### 3️. 간단한 메모 작성

![메모작성](https://user-images.githubusercontent.com/72698829/225727479-a17bebe2-e5a7-4e18-9470-32cdef591290.gif)
공부 목표나 공부 과목 등의 간단한 메모를 작성할 수 있습니다. + 버튼을 누르고 메모 작성 뒤 입력 버튼을 누르면 저장됩니다. 저장된 메모를 누르면 삭제됩니다.

### 4️. 총 공부 시간 기록

![시간기록](https://user-images.githubusercontent.com/72698829/225727490-b5ae8a48-78fc-48b9-ac17-d5b52389d762.gif)
시간 측정 화면에서 정지 버튼을 누르면 자동으로 시간이 기록됩니다. 시간 정도에 따른 색깔과 소수 3째자리까지 표시된 시간을 캘린더에 표시해 줍니다.

## Issue

### 1. 새로고침 후 총 시간 누적하기 (11/29)

- localstorage 활용
    
    ```jsx
    export const studyHour = atom({
      key: "studyHour",
      default: Number(localStorage.getItem("hour")) ?? 0,
    });
    
    export const studyMinute = atom({
      key: "studyMinute",
      default: Number(localStorage.getItem("minute")) ?? 0,
    });
    
    export const studySecond = atom({
      key: "studySecond",
      default: Number(localStorage.getItem("second")) ?? 0,
    });
    ```
    
    ```jsx
    const hour = useRecoilValue(studyHour);
    const minute = useRecoilValue(studyMinute);
    const second = useRecoilValue(studySecond);
    
    const changeLocalTime = () => {
        localStorage.setItem("hour", hour);
        localStorage.setItem("minute", minute);
        localStorage.setItem("second", second);
      };
    ```
    
    atom에 총 시간의 시, 분, 초를 localstorage에 저장한다. 새로고침 하면 localstorage에 있는  시간을 활용하여 누적 시간을 표시해 준다.
    

### 2. Date에서 month 출력 오류 (11/29)

- month + 1
    
    getMonth(); 의 반환 값이 0~11까지 이기 때문
    

### 3. 메모 삭제 시 생기는 오류 (12/2)

- 메모에 랜덤 id 적용
    
    ```jsx
    let newID = function () {
      return Math.random().toString(36).substr(2, 16);
    };
    
    return (
      <input
        onChange={(e) => {
        setContent({ id: newID(), title: e.target.value });
        }}
      />
    );
    
    ```
    
- filter을 이용해 메모 삭제
    
    ```jsx
    <MemoItem
      onClick={() => {
      const cleanMemo = memoList.filter((item) => item.id !== memo.id);
      localStorage.setItem("memo", JSON.stringify(cleanMemo));
      setMemoList(cleanMemo);
      }}
     > 🔥 {memo.title}
     </MemoItem>
    ```
    

### 4. 캘린더 데이터에 날짜 및 누적 시간 저장 (12/2)

- localStorage 활용
    
    ```jsx
    export const calendarData = atom({
      key: "calendarData",
      default: JSON.parse(localStorage.getItem("key")) ?? [],
    });
    ```
    
    ```jsx
    const RecordComponent = () => {
      let data = JSON.parse(localStorage.getItem("key"));
    
      return (
        <RecordBox>
          <ResponsiveCalendar
            data={data} // ...
          />
      )
    }
    ```
    
    atom에 key(날짜, 누적 시간)를 localstorage에 저장한다. 그 후 캘린더에 넣어준다.
    

### 5. 다음날 캘린더 초기화 문제점 (12/2)

- filter 활용
    
    ```jsx
    const changeLocalKey = () => {
      const cleanTimeData = timeData.filter((data) => data.day !== today);
      let copy = [...cleanTimeData];
      copy.push({ value: time, day: today });
      setTimeData(copy);
      localStorage.setItem("key", JSON.stringify(copy));
    };
    ```
    
    오늘 날짜와 마지막 공부 날짜가 같으면 데이터 삭제 후 다시 저장한다.
    

### 6. 다음날 시간 초기화 (12/8)

- 오늘 날짜와 마지막 기록 날짜를 비교 후 다르면 리셋
    
    ```jsx
    const reset = () => {
        resetStudyTime();
        resetLocalTime();
        resetCurrentTime();
      };
    
      useEffect(() => {
        let length = JSON.parse(localStorage.getItem("key")).length;
        let lastStudy = JSON.parse(localStorage.getItem("key"))[length - 1].day;
        let today = `${year}-${month}-${day}`;
        setToday(`${year}-${month}-${day}`);
    
        if (localStorage.getItem("key")) {
          let savedTime =
            currentStartTime -
            second * 1000 -
            minute * 1000 * 60 -
            hour * 1000 * 60 * 60;
    
          lastStudy === today ? setCurrentStartTime(savedTime) : reset();
      }
        }, []);
    ```
    
    마지막 기록 날짜가 오늘이 아닌 경우 누적 시간, 버튼을 누른 시간, localstorage의 시, 분, 초를 리셋 해준다.
    

### 7. 스톱워치 시간이 느리게 가는 현상(12/5 - 12/9)

- Date.now를 이용해 버튼을 클릭한 시간을 저장하여 해결

### 8. 누적 기록 시간 멈추는 현상(12/11)

- 누적 시간 useEffect 조건 수정
    
    ```jsx
    useEffect(() => {
      if (pass === true) {
        let timerId = setTimeout(() => {
        startTotalTime();
      }, 1000);
    
      return () => clearTimeout(timerId);
      }
    }, [start, pass, second, minute, hour]);
    ```
    

### 9. 일시정지 버튼 누르고 정지 버튼 누르면 누적 시간 오류(3/16)

- 정시 버튼 비활성화
    
    ```jsx
    const StopWatchStopComponent = () => {
      return (
        <>{pass ? <Stop onClick={stopOnClickHandler}>■</Stop> : <Stop>■</Stop>}</>
      );
    };
    ```
    

### 10. 버튼 누르면 1초 뒤 시작(3/16)

- 정시 버튼 비활성화
    
    ```jsx
    useEffect(() => {
        if (pass === true) {
          startTotalTime();
          let timerId = setTimeout(() => {
            startTotalTime();
          }, 1000);
    
          return () => clearTimeout(timerId);
        }
      }, [pass, second]);
    ```
    

### 11. 새로고침 해도 시간 유지(3/16)

- 타이머 실행 중 바로 localstorage 저장
    
    ```jsx
    // MainComponent.js
    
    useEffect(() => {
        if (pass === true) {
          startTotalTime();
          changeLocalKey();
          changeLocalTime();
          let timerId = setTimeout(() => {
            startTotalTime();
            changeLocalKey();
            changeLocalTime();
          }, 1000);
    
          return () => clearTimeout(timerId);
        }
      }, [pass, second]);
    ```
    

### 12. useSetTime hook 제작(3/16)

- useSetTime
    
    ```jsx
    const [hour, minute, second] = useSetTime(!pause, currentStartCTime);
    const [hour, minute, second] = useSetTime(pause, currentStartRTime);
    ```
    
    ```jsx
    import React, { useEffect, useState } from "react";
    
    const useSetTime = (condition, currentStartTime) => {
      const [hour, setHour] = useState(0);
      const [minute, setMinute] = useState(0);
      const [second, setSecond] = useState(0);
    
      const startConcentrateTime = () => {
        const now = new Date(Date.now() - currentStartTime);
    
        setSecond(now.getUTCSeconds());
        setMinute(now.getUTCMinutes());
        setHour(now.getUTCHours());
      };
    
      useEffect(() => {
        if (condition === true) {
          startConcentrateTime();
          let timerId = setTimeout(() => {
            startConcentrateTime();
          }, 1000);
    
          return () => clearTimeout(timerId);
        }
      }, [condition, second]);
    
      return [hour, minute, second];
    };
    
    export default useSetTime;
    ```
    

### 13. 연도가 바뀌면 동적으로 차트 변화(3/16)

- height에 props로 값 전달
