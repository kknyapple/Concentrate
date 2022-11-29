import { atom } from "recoil";

export const timerStart = atom({
  key: "timerStart",
  default: false,
});

export const timePass = atom({
  key: "timePass",
  default: false,
});
