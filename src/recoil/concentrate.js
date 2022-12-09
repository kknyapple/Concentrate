import { atom } from "recoil";

export const stopWatchStart = atom({
  key: "stopWatchStart",
  default: false,
});

export const studyTimePass = atom({
  key: "studyTimePass",
  default: false,
});

export const pauseClicked = atom({
  key: "pauseClicked",
  default: false,
});

export const totalStudyTime = atom({
  key: "totalStudyTime",
  default: [0, 0, 0],
});

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

export const studyMemo = atom({
  key: "memo",
  default: JSON.parse(localStorage.getItem("memo")) ?? [],
});

export const calendarData = atom({
  key: "calendarData",
  default: JSON.parse(localStorage.getItem("key")) ?? [],
});

export const startTime = atom({
  key: "startTime",
  default: null,
});

export const pauseTime = atom({
  key: "pauseTime",
  default: null,
});

export const stopTime = atom({
  key: "stopTime",
  default: null,
});

export const todayDate = atom({
  key: "todayDate",
  default: null,
});

export const startCTime = atom({
  key: "startCTime",
  default: null,
});

export const pauseCTime = atom({
  key: "pauseCTime",
  default: null,
});

export const stopCTime = atom({
  key: "stopCTime",
  default: null,
});
