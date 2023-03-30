import { atom } from "recoil";
import { Memo, StudyData, Subject } from "types/types";

export const studyMemo = atom<Memo[]>({
  key: "memo",
  default: JSON.parse(localStorage.getItem("memo") as string) ?? [],
});

export const calendarData = atom<StudyData[]>({
  key: "calendarData",
  default: JSON.parse(localStorage.getItem("key") as string) ?? [],
});

export const subjectDataState = atom<Subject[]>({
  key: "subjectDataState",
  default: JSON.parse(localStorage.getItem("subject") as string) ?? [
    { name: "집중하기", savedTime: 0 },
  ],
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
