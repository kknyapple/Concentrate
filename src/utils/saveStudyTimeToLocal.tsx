const saveStudyTimeToLocal = (hour: number, minute: number, second: number) => {
  localStorage.setItem("hour", String(hour));
  localStorage.setItem("minute", String(minute));
  localStorage.setItem("second", String(second));
};

export default saveStudyTimeToLocal;
