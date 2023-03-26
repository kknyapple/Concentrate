interface StudyData {
  value: string;
  day: string;
}

const filterTimeData = (timeData: StudyData[], today: string): StudyData[] => {
  return timeData.filter((data) => data.day !== today);
};

const updateStudyData = (
  cleanTimeData: StudyData[],
  convertTime: string,
  today: string = ""
): StudyData[] => {
  return [...cleanTimeData, { value: convertTime, day: today }];
};

const saveStudyDataToLocal = (updatedStudyData: StudyData[]) => {
  localStorage.setItem("key", JSON.stringify(updatedStudyData));
};

export { filterTimeData, updateStudyData, saveStudyDataToLocal };
