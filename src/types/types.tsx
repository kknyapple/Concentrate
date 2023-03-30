import { SetterOrUpdater } from "recoil";

interface StudyData {
  value: string;
  day: string;
}

interface Subject {
  name: string;
  savedTime: number;
}

interface SubjectProps {
  subject: Subject;
  setSubjectData: SetterOrUpdater<any>;
}

interface Memo {
  id: string;
  title: string;
}

export type { StudyData, Subject, SubjectProps as Props, Memo };
