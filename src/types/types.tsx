import { SetterOrUpdater } from "recoil";

interface StudyData {
  value: string;
  day: string;
}

interface Subject {
  name: string;
  savedTime: number;
}

interface Props {
  subject: Subject;
  setSubjectData: SetterOrUpdater<any>;
}

export type { StudyData, Subject, Props };
