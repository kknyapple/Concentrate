import { atom } from "recoil";

export const stopWatchStart = atom<boolean>({
  key: "stopWatchStart",
  default: false,
});

export const studyTimePass = atom<boolean>({
  key: "studyTimePass",
  default: false,
});

export const pauseClicked = atom<boolean>({
  key: "pauseClicked",
  default: false,
});

/* export const totalStudyTime = atom({
  key: "totalStudyTime",
  default: [0, 0, 0],
}); */

export const selectedState = atom<string>({
  key: "selectedState",
  default: "",
});

export const timeState = atom({
  key: "timeState",
  default: { start: 0, pause: 0 },
});

export const concentrateTimeState = atom({
  key: "concentrateTimeState",
  default: { start: 0, pause: 0 },
});

export const restTimeState = atom({
  key: "restTimeState",
  default: { start: 0, pause: 0 },
});

export const todayDate = atom<string>({
  key: "todayDate",
  default: "",
});
