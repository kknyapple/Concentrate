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

interface Memo {
  id: string;
  title: string;
}

interface CalendarEntry {
  value: string;
  day: string;
}

export const studyMemo = atom<Memo[]>({
  key: "memo",
  default: JSON.parse(localStorage.getItem("memo") as string) ?? [],
});

export const calendarData = atom<CalendarEntry[]>({
  key: "calendarData",
  default: JSON.parse(localStorage.getItem("key") as string) ?? [],
});

export const startTime = atom<number>({
  key: "startTime",
  default: 0,
});

export const pauseTime = atom<number>({
  key: "pauseTime",
  default: 0,
});

export const stopTime = atom<number>({
  key: "stopTime",
  default: 0,
});

export const todayDate = atom<string | null>({
  key: "todayDate",
  default: null,
});

export const concentrateTimeState = atom({
  key: "concentrateTimeState",
  default: { start: 0, pause: 0 },
});

export const resetTimeState = atom({
  key: "resetTimeState",
  default: { start: 0, pause: 0 },
});
