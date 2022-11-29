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
