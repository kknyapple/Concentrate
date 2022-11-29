import { atom } from "recoil";

export const stopWatchStart = atom({
  key: "stopWatchStart",
  default: false,
});

export const timePass = atom({
  key: "timePass",
  default: false,
});
