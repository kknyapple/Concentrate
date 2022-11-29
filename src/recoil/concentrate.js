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
